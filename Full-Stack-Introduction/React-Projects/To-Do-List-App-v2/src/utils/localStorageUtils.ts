export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save ${key} to local storage:`, error);
  }
}

export function loadFromLocalStorage<T>(key: string): T | null {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : null;
  } catch (error) {
    console.error(`Failed to load ${key} from local storage:`, error);
    return null;
  }
}