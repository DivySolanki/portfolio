"use client"

import { useState, useRef, useEffect } from "react"
import { ExternalLink, X, ChevronDown } from "lucide-react"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: {
    title: string
    description: string
    summary?: string
    tags: string[]
    image: string
    link: string
  }
}

export function ProjectDialog({ open, onOpenChange, project }: ProjectDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)

  // Check if content is scrollable and if we're at the bottom
  const checkScrollability = () => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = contentRef.current
      setCanScroll(scrollHeight > clientHeight)
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 20) // 20px threshold
    }
  }

  // Handle scroll event
  const handleScroll = () => {
    checkScrollability()
  }

  // Scroll down when arrow is clicked
  const scrollDown = () => {
    if (contentRef.current) {
      contentRef.current.scrollBy({ top: 200, behavior: "smooth" })
    }
  }

  // Check scrollability when dialog opens or content changes
  useEffect(() => {
    if (open) {
      checkScrollability()
      window.addEventListener("resize", checkScrollability)
      return () => window.removeEventListener("resize", checkScrollability)
    }
  }, [open, project])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0 overflow-hidden mx-auto my-auto">
        <div className="relative aspect-video w-full">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          <DialogClose className="absolute top-4 right-4 rounded-full bg-background/80 p-1.5 backdrop-blur-sm z-10 hover:bg-background/90 transition-colors">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div
          ref={contentRef}
          className="max-h-[calc(90vh-40vh)] overflow-y-auto scrollbar-hide p-6"
          onScroll={handleScroll}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">{project.description}</DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-4">
            <div>
              <h4 className="text-sm font-semibold">Project Name:</h4>
              <p>{project.title}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Summary:</h4>
              <p>{project.summary || project.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Technology Used:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        {canScroll && !isAtBottom && (
          <div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
            onClick={scrollDown}
          >
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-sm">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

