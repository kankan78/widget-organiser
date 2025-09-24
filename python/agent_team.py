from pathlib import Path
import os
import json
from typing import List, Dict, Any
from fastapi.responses import JSONResponse
from httpx import Timeout
from phi.agent import Agent
from phi.model.openai import OpenAIChat
# from phi.tools.duckduckgo import DuckDuckGo
# from phi.tools.yfinance import YFinanceTools
from phi.model.groq import Groq
from phi.model.google import Gemini
# from firecrawl_compat import FirecrawlCompatTools as FirecrawlTools
from dotenv import load_dotenv
from amazon_paapi import AmazonApi
from phi.run.response import RunResponse
from phi.tools import tool
from schemas_local import ImageInfo

load_dotenv()

@tool
# Simple tool to query Amazon PA-API by keywords
def search_items_tool(keywords: str, item_count: int = 3, search_index: str = "Apparel") -> str:
    """
    Search Amazon Product Advertising API for given keywords.
    - keywords: free-text query (include item type, color, gender where possible)
    - item_count: number of items to return (max allowed by API is 10)
    - search_index: PA-API search index (e.g., 'Apparel')

    Returns a dict with 'items': [ { asin, title, url, price, rating } ].
    """
    access_key = os.getenv("AWS_ACCESS_KEY") or os.getenv("ACCESS_KEY")
    secret_key = os.getenv("AWS_SECRET_KEY") or os.getenv("SECRET_KEY")
    partner_tag = os.getenv("AWS_PARTNER_TAG") or os.getenv("PARTNER_TAG")
    if not (access_key and secret_key and partner_tag):
        return json.dumps({"error": "Missing AWS_ACCESS_KEY/AWS_SECRET_KEY/AWS_PARTNER_TAG env vars"})

    api = AmazonApi(access_key, secret_key, partner_tag, country="IN", throttling=2, timeout=10)
    try:
        print("Started search_items", keywords)
        result = api.search_items(
            keywords=keywords,
            item_count=item_count,
            search_index=search_index,
            # search_items_resource=["Images.Primary.Medium"]
        )
    except Exception as e:
        print(str(e))
        return {"error": str(e)}
    except Timeout:
        print("Amazon API request timed out")

    items: List[Dict[str, Any]] = []
    try:
        # Prefer unified data list shape
        candidates = result.items or []
        # print(candidates)
        if not candidates:
            # Fallbacks for other SDK shapes
            search_results = result.get("SearchResult") or result.get("search_result") or result
            if isinstance(search_results, dict) and "Items" in search_results:
                candidates = search_results["Items"]
            elif isinstance(result, dict) and "items" in result:
                candidates = result["items"]

        for it in candidates:
            asin = it.asin or it.get("ASIN")

            # image may be nested or flat depending on SDK
            image = (
                it.images.primary.medium.url
                or it.get("images").get("primary").get("medium").get("url")
                or it.__getattribute__("images").__getattribute__("primary").__getattribute__("medium").__getattribute__("url")
                or it.get("item_info", {}).get("title", {}).get("display_value")
                or it.get("ItemInfo", {}).get("Title", {}).get("DisplayValue")
            )
            url = (
                it.detail_page_url
                or it.__getattribute__("detail_page_url")
                or it.get("DetailPageURL")
                or it.get("detail_page_url")
            )

            items.append({
                "asin": asin,
                "image": image,
                "url": url
            })
    except Exception as e:
        print(str(e))
        return {"error": str(e)}

    return json.dumps(items[:item_count], ensure_ascii=False)

image_agent = Agent(
    name="Image Agent",
    # model=Gemini(id="gemini-2.0-flash-exp"),
    model=OpenAIChat(id="gpt-4.1-mini"),
    # model=Groq(id="llama-3.3-70b-versatile"),
    instructions=[
        "Analyze the photo and detect all visible items (clothing, accessories, electronics, etc.).",
        "Prioritize items that satisfy as many requirements as possible; ensure at least a 50% match.",
        "Detect and clearly list key attributes for each detected item (e.g., price, features, gender).",
        "Must Calculate the exact image size (height and width) and include it in the JSON.",
        "Must Calculate precise [x,y] coordinates for each item's position in the image, respective to the original image aspect ratio.",
        "After detection, for each item, compose a keywords string using ( type + color + gender(required) + description(required) )",
        "Must Call the tool search_items_tool(keywords, item_count=2)",
        "Attach the top results to each detected item under shopping_links: an array of {asin, url, image}.",
        "Present the results clearly and neatly."
    ],
    temprature=0,
    # show_tool_calls=True,
    markdown=True,
    tools=[search_items_tool],
    # debug_mode=True
)

agent_team = Agent(
    team=[image_agent],
    # model=Gemini(id="gemini-2.0-flash-exp"),
    model=OpenAIChat(id="gpt-4.1-mini"),
    # model=Groq(id="llama-3.3-70b-versatile"),
    instructions=[
        "Always include sources.", 
        "Return valid JSON that can be parsed with JSON.parse().",
        "Dont miss Required properties of output JSON image.size , detected_items.coordinate"
    ],
    temprature=0,
    show_tool_calls=True,
    markdown=True,
    response_model=ImageInfo,
    # debug_mode=True,
)

_image_path_env = os.getenv("IMAGE_PATH")
image_path = None
if _image_path_env:
    if _image_path_env.startswith(("http://", "https://")):
        image_path = _image_path_env
    else:
        _temp_path = Path(_image_path_env)
        if _temp_path.exists():
            image_path = _temp_path
        else:
            print(f"Warning: IMAGE_PATH points to non-existent file: {_temp_path}")
else:
    print("Warning: IMAGE_PATH not set.")

# agent_team.print_response(
#     "Strictly visit the Image URL and analyse the image , and detect all the items, and pass it to the search_items_tool for buying links",
#     images=[str("https://m.media-amazon.com/images/I/4153wDM8zbL._SL160_.jpg")] if image_path else []
# )

# agent_team.print_response("Summarize analyst recommendations for NVDA and share the latest news", stream=True)

# response: RunResponse = agent_team.run(message="Strictly visit the Image URL and analyse the image , and detect all the items, and pass it to the search_items_tool for buying links",images=[str("https://m.media-amazon.com/images/I/41K1DbVEU-L._SX679_.jpg")])

# Convert the Pydantic model instance to a JSON string
# result = response.content.model_dump()
# print(response.content.model_dump_json())
        