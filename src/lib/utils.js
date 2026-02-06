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

export const copyToClipboard = async (text) => {
  if (typeof document === 'undefined') return false;

  try {
    if (navigator?.clipboard && document.hasFocus()) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    // Fall back to legacy copy path.
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (err) {
    copied = false;
  } finally {
    document.body.removeChild(textarea);
  }

  return copied;
};

