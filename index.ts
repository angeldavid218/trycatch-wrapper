import { safeAwait } from './safeAwait';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
};

const fetchData = async () => {
  const [data, error] = await safeAwait(fetchPosts());
  if (error) {
    console.error('Error fetching data', error);
    return;
  }

  return data;
};

fetchData();
