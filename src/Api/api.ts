export const fetchRandomAdvice = async () => {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    return data.slip;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};
