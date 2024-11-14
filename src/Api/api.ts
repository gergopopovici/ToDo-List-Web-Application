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
export const fetchAdviceByKeyword = async (keyword: string) => {
  try {
    const response = await fetch(`https://api.adviceslip.com/advice/search/${keyword}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};
