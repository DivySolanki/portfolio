"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExperienceCardProps {
  title: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
  delay?: number;
}

export function ExperienceCard({
  title,
  company,
  date,
  description,
  skills,
  delay = 0,
}: ExperienceCardProps) {
  const renderDescription = (text: string) => {
    if (!text) return null;

    // Split the text by newline characters
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-4">
        {line.trim()}
      </p>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-lg text-muted-foreground">{company}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1 md:mt-0">{date}</p>
          </div>
          <div>{renderDescription(description)}</div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
