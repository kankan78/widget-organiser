"use client"

import React from 'react';

const StoryContent = ({
  items,
  heading = 'Side-by-Side Refrigerators',
  saleName = 'Amazon Great Indian Sale',
  introParagraph1 = 'आजकल काफी पॉपुलर हो रहे हैं क्योंकि इनमें स्पेस और फीचर्स दोनों बढ़िया मिल जाते हैं। ज्यादा स्टोरेज स्पेस के साथ ये रेफ्रिजरेटर आते हैं। इनमें ढेर सारे फूड आइटम्स को आराम से स्टोर करके रखा जा सकता है। साइड-बाय-साइड रेफ्रिजरेटर बड़े परिवारों और मॉडर्न किचन के लिए परफेक्ट चॉइस होते हैं। कमर्शियल यूज के लिए भी साइड-बाय-साइड रेफ्रिजरेटर सही माने जाते हैं।',
  introParagraph2 = 'बढ़िया स्टोरेज कैपेसिटी के साथ आने वाले बेस्ट साइड-बाय-साइड रेफ्रिजरेटर के लिस्ट आपको यहां पर मिल जाएगी। सैमसंग एलजी और हायर जैसे ब्रांड्स के साइड-बाय-साइड रेफ्रिजरेटर यहां दिए गए हैं। इन बेस्ट रेफ्रिजरेटर पर 48% तक का डिस्काउंट {saleName} में मिल जाएगा।',
  buyNowLabel = 'Buy Now',
  buyNowRel = 'nofollow sponsored',
}) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <article className="story-content prose prose-sm max-w-none text-gray-800">
      <h2 className="text-xl font-bold mb-2"><strong>{heading}</strong></h2>
      <p className="leading-relaxed">{introParagraph1}</p>
      <p className="mt-3 leading-relaxed">{introParagraph2.replace('{saleName}', saleName)}</p>
      <div className="tableContainer mt-6">
        <table className="w-full table-auto border-collapse">
          <tbody>
            <tr className="bg-gray-100">
              <td className="p-3 text-sm font-semibold align-top">
                <strong>
                  ये {heading} आते हैं बेहतरीन स्टोरेज कैपेसिटी के साथ
                </strong>
              </td>
              <td className="p-3 text-sm font-semibold align-top">
                <strong>यहां से खरीदें</strong>
              </td>
            </tr>
            {items.map((row, idx) => (
              <tr key={`r-${row.productId}-${idx}`} className="border-b">
                <td className="p-3 text-sm">
                  {row.title?.split(/[|(]/)[0]?.trim()}
                </td>
                <td className="p-3 text-sm">
                  <a
                    target="_blank"
                    id="tilCustomLink"
                    href={row.url}
                    rel="nofollow sponsored"
                    className="inline-block px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    {buyNowLabel}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 space-y-10">
        {items.map((row, idx) => (
          <section key={`sec-${row.productId}-${idx}`} className="">
            <h3 className="font-semibold mb-3">
              <strong>{row.title?.split(/[|(]/)[0]?.trim()}</strong>
            </h3>
            <div className="as-embed-wrapper">
              <a id="undefined" href={row.url} rel="nofollow sponsored" target="_blank" className="block">
                <div className="flex items-center justify-center">
                  <img
                    src={row.image}
                    alt={row.title}
                    title={row.title}
                    loading="lazy"
                    className="max-h-72 w-auto object-contain"
                  />
                </div>
              </a>
              <p className="mt-3 text-sm leading-relaxed">{row.hindiDescription}</p>
              <div className="mt-4">
                <iframe
                  src={`https://affiliatewidgets.indiatimes.com/affiliates_content_iframe_v2.cms?jarvis_client=languages&website=languages&type=widget_slots&pagename=articleshow&affiliatename=amazon&v2=yes&lang=hi_IN&uid=123&platform=web&productid=${row.ASIN}&pagename=articleshow&tag=nbt_abcard3_js-21`}
                  className="amzproduct w-full"
                  scrolling="no"
                  title="Apna Bazaar"
                  allowtransparency="true"
                  data-index="NaN"
                ></iframe>
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
};

export default StoryContent;


