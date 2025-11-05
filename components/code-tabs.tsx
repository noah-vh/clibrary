"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"

interface CodeTabsProps {
  react?: string
  html?: string
}

export function CodeTabs({ react, html }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(react ? "react" : "html")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        {react && <TabsTrigger value="react">React</TabsTrigger>}
        {html && <TabsTrigger value="html">HTML</TabsTrigger>}
      </TabsList>
      {react && (
        <TabsContent value="react">
          <CodeBlock code={react} language="typescript" />
        </TabsContent>
      )}
      {html && (
        <TabsContent value="html">
          <CodeBlock code={html} language="html" />
        </TabsContent>
      )}
    </Tabs>
  )
}
