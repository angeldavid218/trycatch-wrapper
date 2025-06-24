# TryCatch Wrapper

A lightweight TypeScript utility that provides a clean and type-safe way to handle async operations without try-catch blocks. This project demonstrates how to wrap promises to return a tuple of `[data, error]` instead of throwing exceptions.

## 🚀 Features

- **Type-safe error handling**: Returns typed tuples `[T | null, Error | null]` instead of throwing exceptions
- **Zero dependencies**: Pure TypeScript implementation with no external dependencies
- **Simple API**: Easy-to-use `safeAwait` function that wraps any promise
- **TypeScript support**: Full type safety with generics

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

This project uses TypeScript and ts-node for development.

### Prerequisites

- Node.js (version 14 or higher)
- npm

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

```bash
npm start
```

This will execute the example in `index.ts` which demonstrates fetching posts from JSONPlaceholder API using the `safeAwait` wrapper.

## 📖 Usage

### Basic Usage

```typescript
import { safeAwait } from './safeAwait';

const fetchData = async () => {
  const [data, error] = await safeAwait(fetch('https://api.example.com/data'));

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  return data;
};
```

### Example from the Project

The project includes a practical example in `index.ts`:

```typescript
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
```

## 🔧 How It Works

The `safeAwait` function wraps any promise and returns a tuple:

```typescript
export const safeAwait = async <T>(
  promise: Promise<T>
): Promise<[T | null, Error | null]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
};
```

### Return Type

- **Success case**: `[data, null]` - The promise resolved successfully
- **Error case**: `[null, error]` - The promise was rejected, error is normalized to Error instance

## 🏗️ Project Structure

```
trycatch-wrapper/
├── index.ts          # Example usage and demonstration
├── safeAwait.ts      # Core utility function
├── package.json      # Project configuration
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

## 🧪 Testing

Currently, the project doesn't include tests, but you can run:

```bash
npm test
```

This will show a placeholder message indicating no tests are configured.

## 📝 License

ISC License

## 👨‍💻 Author

Angel Serrano

## 💡 Use Cases

This utility is particularly useful for:

- **API calls**: Handle network requests without try-catch blocks
- **Database operations**: Clean error handling for database queries
- **File operations**: Safe file reading/writing operations
- **Any async operation**: Where you prefer explicit error handling over exceptions

## 🔄 Alternative Patterns

This pattern is inspired by Go's error handling and similar utilities like:

- Rust's `Result<T, E>` type
- Go's `(value, error)` return pattern
- Libraries like `neverthrow` or `fp-ts`

The `safeAwait` function provides a simple way to adopt this pattern in TypeScript without additional dependencies.
