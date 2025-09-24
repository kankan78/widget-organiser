from typing import List, Union
from pydantic import BaseModel, Field, HttpUrl

class ImageSize(BaseModel):
    h: str = Field(..., description="Image height with unit, e.g., '600px'")
    w: str = Field(..., description="Image width with unit, e.g., '400px'")

class Coordinate(BaseModel):
    x: int = Field(..., ge=0, description="X coordinate in pixels")
    y: int = Field(..., ge=0, description="Y coordinate in pixels")

class ShoppingLink(BaseModel):
    asin: str = Field(..., min_length=1)
    url: HttpUrl
    image: Union[str, HttpUrl]

class DetectedItem(BaseModel):
    type: str
    gender: str
    description: str
    color: str
    coordinate: Coordinate
    shopping_links: List[ShoppingLink] = Field(default_factory=list)

class ImageInfo(BaseModel):
    url: Union[str, HttpUrl]
    size: ImageSize
    detected_items: List[DetectedItem]


