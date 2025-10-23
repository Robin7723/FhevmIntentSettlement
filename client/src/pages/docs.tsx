import { Card } from "@/components/ui/card";
import { ExternalLink, Book, Code, Shield } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 -z-10" />
      
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
            Documentation
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn about Fully Homomorphic Encryption and how this protocol works
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Getting Started with FHEVM</h3>
                <p className="text-muted-foreground mb-4">
                  Learn the basics of Fully Homomorphic Encryption and how to build privacy-preserving applications
                </p>
                <a
                  href="https://docs.zama.ai/fhevm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Visit Zama FHEVM Docs
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-secondary/10">
                <Code className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Solidity Guides</h3>
                <p className="text-muted-foreground mb-4">
                  Write smart contracts with encrypted data types and confidential computations
                </p>
                <a
                  href="https://docs.zama.ai/fhevm/guides/solidity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  View Solidity Guides
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-info/10">
                <Shield className="h-6 w-6 text-info" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Security & Privacy</h3>
                <p className="text-muted-foreground mb-4">
                  Understand the cryptographic foundations and security guarantees of FHEVM
                </p>
                <a
                  href="https://docs.zama.ai/fhevm/fundamentals/security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Learn About Security
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <svg className="h-6 w-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">API Reference</h3>
                <p className="text-muted-foreground mb-4">
                  Complete reference for encrypted data types, operators, and functions
                </p>
                <a
                  href="https://docs.zama.ai/fhevm/references/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Browse API Reference
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-12 p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
          <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.zama.ai/post/programmable-privacy-and-fhevm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Introduction to Programmable Privacy
              </a>
            </li>
            <li>
              <a
                href="https://github.com/zama-ai/fhevm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                FHEVM GitHub Repository
              </a>
            </li>
            <li>
              <a
                href="https://docs.zama.ai/fhevm/tutorials"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Interactive Tutorials
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
