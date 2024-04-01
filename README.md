This is an Express app that runs as a proxy to Google's Vertex Search
## Getting Started

First, install gcloud cli 
```bash
brew install --cask google-cloud-sdk
```

Second, install dependencies:

```bash
npm install
```

Third, authenticate with Google

```bash
gcloud auth application-default login
```

Run the application 

```bash
npm run dev 
```

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.

You can start editing the page by modifying `src/index.ts`. The page auto-updates as you edit the file.

## Learn More

To learn more about Vertex AI, take a look at the following resources:

- [Vertex AI Search Documentation](https://cloud.google.com/generative-ai-app-builder/docs/libraries?hl=en) - learn about Vertex AI Search client libraries.

