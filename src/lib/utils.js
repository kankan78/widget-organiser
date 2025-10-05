export const fetchProductsData = async (fallbackProducts) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return fallbackProducts;
};

export const generateStoryFromProducts = (items) => {
  const [a, b, c] = items;
  const title = `A Smart Shopper's Day: ${a.title.split(' ')[0]}, ${b.title.split(' ')[0]} & ${c.title.split(' ')[0]}`;
  const part = (p) => `${p.title} at ${p.price}${p.discount ? ` (${p.discount})` : ''}`;
  const body = `It started with ${part(a)}. Soon after, ${part(b)} caught the eye for its value. To wrap it up, ${part(c)} sealed the deal. Together, these picks balance quality, price, and savings, making a perfect trio.`;
  return `${title}\n\n${body}`;
};

export const fetchProductData = async (defaultProducts) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { ...defaultProducts[0] };
};


