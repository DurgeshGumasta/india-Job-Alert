import { openai } from "../openai";

// ... somewhere in your route
const response = await openai.images.generate({
  prompt: "a cat",
  n: 1,
  size: "1024x1024",
});

// will be a URL to an image of a cat!
const url = response.data[0].url;