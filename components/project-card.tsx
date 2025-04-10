"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProjectDialog } from "@/components/project-dialog"

interface ProjectCardProps {
  title: string
  description: string
  summary?: string
  tags: string[]
  image: string
  link: string
  delay?: number
}

export function ProjectCard({ title, description, summary, tags, image, link, delay = 0 }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
      >
        <Card
          className="overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-lg dark:bg-gray-900 cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={{ title, description, summary, tags, image, link }}
      />
    </>
  )
}

