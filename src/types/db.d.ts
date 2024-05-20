interface User {
  name: string;
  email: string;
  image: string;
  id: string;
}

interface Messages {
  id: string;
  senderId: string;
  RecieverId: string;
  text: string;
  timestamp: number;
}

interface Chat {
  id: string;
  messages: Messages[];
}

interface FriendRequest {
  id: string;
  senderId: string;
  RecieverId: string;
}
