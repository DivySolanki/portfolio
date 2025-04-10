"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/project-card";
import { ExperienceCard } from "@/components/experience-card";
import { ContactForm } from "@/components/contact-form";
import { NavBar } from "@/components/nav-bar";
import { Model3D } from "@/components/model-3d";

const handleDownload = () => {
  const link = document.createElement("a");
  link.href =
    "https://www.dropbox.com/scl/fi/9jhjc5evbu2iwwcpnrsm2/Divy-Solanki-CV.pdf?rlkey=itn8ee2ww28op7i6dcqkbwms5&st=nq2srx0l&raw=1";
  link.download = "Divy_Solanki_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <main className="min-h-screen bg-background text-foreground antialiased ">
      <NavBar />

      {/* Hero Section */}
      <section
        id="home"
        ref={ref}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <motion.div
          className="container relative z-10 px-4 md:px-6 text-center"
          style={{ opacity, scale, y }}
        >
          <div className="flex flex-col items-center text-center space-y-4 mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="mb-4 text-sm font-medium" variant="outline">
                AI/ML Engineer
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Divy Solanki
            </motion.h1>
            <motion.p
              className="max-w-[700px] text-muted-foreground md:text-xl"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Building intelligent systems that solve real-world problems
            </motion.p>
            <motion.div
              className="flex flex-col items-center gap-4 mt-8"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Top row with two buttons side by side */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("projects")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View Projects
                  </a>
                </Button>
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </div>

              {/* Bottom button centered to form inverted triangle */}
              <div className="mt-2">
                <Button variant="secondary" asChild>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Contact Me
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="h-full w-full">
            <Canvas>
              <Model3D />
              <Environment preset="studio" />
            </Canvas>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer flex items-center justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          onClick={() => {
            const projectsSection = document.getElementById("projects");
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Rest of the page content remains unchanged */}
      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 md:py-32 bg-muted/50 dark:bg-gray-900/50"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="flex flex-col items-center text-center space-y-4 mb-12 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Projects
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              A showcase of my work in AI, ML and Web Development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <ProjectCard
              title="LinkLens – Extracting Financial Insights with LLM"
              description="An interactive tool for people in finance to extract insights from web links"
              summary="LinkLens is an intelligent tool designed to assist finance professionals by using Langchain and LLaMA 2 to extract relevant financial information from three different website links. This project focuses on enhancing productivity by automating the process of gathering and summarizing financial data. By leveraging LLMs, it streamlines research and decision-making processes in the financial sector, significantly reducing the manual effort typically required for data analysis."
              tags={["Langchain", "LLaMA 2", "Python"]}
              image="/images/Finance_LLM.png?height=400&width=600"
              link="https://github.com/DivySolanki/LLM-for-Finance"
              delay={0}
            />
            <ProjectCard
              title="VidBlogGen – Generate blogs from Youtube videos"
              description="A tool that converts YouTube videos into blog posts"
              summary="VidBlogGen is a content creation tool that transforms YouTube videos into well-crafted blog posts with minimal effort. Powered by CrewAI, Ollama, and LLaMA 3.1, it automates the content generation process by leveraging large language models. This optimization reduces the transformation time by 70%, making the tool highly efficient for content creators and marketers looking to repurpose video content into written form."
              tags={["CrewAI", "Ollama", "LLaMa 3.1", "Python"]}
              image="/images/yt.jpg?height=400&width=600"
              link="https://github.com/DivySolanki/Youtube-Videos-to-Blog"
              delay={0.1}
            />
            <ProjectCard
              title="Flappy Evolution – Genetic Algorithm-Driven Flappy Bird AI"
              description="An AI-powered version of Flappy Bird using genetic algorithms"
              summary="Flappy Evolution is an AI-powered version of Flappy Bird that uses genetic algorithms and neural networks to evolve gameplay intelligence. Developed using Python and Pygame, the project trains an autonomous Flappy Bird agent to improve its performance over successive generations. The use of evolutionary strategies highlights the effectiveness of genetic algorithms in enhancing AI behavior and adaptability within game environments."
              tags={["Python", "Pygame", "NEAT-Python"]}
              image="/images/flappy.jpg?height=400&width=600"
              link="https://github.com/DivySolanki/Flappy-Evolution"
              delay={0.2}
            />
            <ProjectCard
              title="SortViz – Sorting Visualizer"
              description="An interactive tool for visualizing sorting algorithms"
              summary="SortViz is an interactive educational tool built using a frontend stack to help users learn sorting algorithms through real-time visualization. It demonstrates five key algorithms—bubble sort, merge sort, quick sort, selection sort, and insertion sort—in an engaging and intuitive interface. The tool allows users to observe the behavior of each algorithm, making complex sorting techniques more accessible and easier to understand."
              tags={["React", "Javascript", "CSS"]}
              image="/images/Sort.png?height=400&width=600"
              link="https://github.com/sakshi-si/sorting-visualizer"
              delay={0.3}
            />
            <ProjectCard
              title="Chicken Disease Classification"
              description="An AI system for detecting poultry diseases"
              summary="​The Chicken Disease Classification project is an AI-driven system designed to detect and classify poultry diseases from chicken fecal images. Utilizing Convolutional Neural Networks (CNNs), the model analyzes images to accurately identify conditions such as Coccidiosis, Salmonella, and Newcastle disease. The project employs data version control tools to manage datasets and ensure reproducibility. By automating disease detection, this system aims to assist poultry farmers in early diagnosis, thereby reducing economic losses and improving flock health management."
              tags={["Python", "TensorFlow", "CNN"]}
              image="/images/chicken.png?height=400&width=600"
              link="https://github.com/DivySolanki/Chicken-Disease-Classification"
              delay={0.4}
            />
            <ProjectCard
              title="Langchain Projects"
              description="A collection of AI-driven tools using the Langchain library"
              summary="The Langchain Projects repository showcases a collection of AI-driven tools that leverage the Langchain library for various natural language processing tasks. One project features a conversational chatbot powered by LLaMA 2, providing an accessible interface for real-time interactions without commercial dependencies. Another tool enables users to query PDF documents using LLaMA2 APIs, integrating HuggingFaceEmbeddings and CassandraDB for efficient data storage and retrieval. Additional projects include an automated blog generator that transforms raw inputs into structured content, a Chat-to-DB interface that allows natural language database querying, and a hybrid search system combining keyword and vector-based search for enhanced information retrieval. Together, these projects demonstrate the flexibility and power of Langchain in building intelligent, user-friendly applications."
              tags={["Langchain", "Python", "AI"]}
              image="/images/Langchain.png?height=400&width=600"
              link="https://github.com/DivySolanki/Langchain"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 md:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="flex flex-col items-center text-center space-y-4 mb-12 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Experience
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              My professional journey in the field of computer science
            </p>
          </motion.div>

          <Tabs defaultValue="work" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="work">Work Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="work" className="space-y-6">
              <ExperienceCard
                title="Software Developer"
                company="AVP Robotics"
                date="June 2023 - May 2024"
                description="As a Software Developer at AVP Robotics, I spearheaded the development of Rapidquote, an innovative solution that automated the 3D printing STL object quotation process, achieving a 99% efficiency gain and reducing quotation time significantly. I took ownership of the back-end system architecture, ensuring high performance, and collaborated effectively with a team of six and stakeholders. My responsibilities included crafting comprehensive data schemas, developing 38 intuitive APIs covering various functionalities, and meticulously documenting the entire API suite in Postman. I also prioritized system security and reliability, integrated three.js for enhanced 3D model interaction, and successfully led the project through its integration phase."
                skills={[
                  "React",
                  "NodeJS",
                  "API",
                  "Postman",
                  "MongoDB",
                  "Three.js",
                  "Schema Design",
                ]}
                delay={0}
              />
              <ExperienceCard
                title="RasberryPi Intern"
                company="Kaizen Futuretech"
                date="July 2021 - July 2021"
                description="During my internship at Kaizen Futuretech, I gained hands-on experience developing Internet of Things (IoT) solutions utilizing Raspberry Pi and Python. This role allowed me to apply my technical skills in a practical setting, contributing to the creation and implementation of innovative IoT projects."
                skills={["Python", "NLP", "Raspberry Pi", "IoT"]}
                delay={0.1}
              />
            </TabsContent>
            <TabsContent value="education" className="space-y-6">
              <ExperienceCard
                title="M.Sc. in Advance Computer Science: Artificial Intelligence"
                company="The University of Manchester"
                date="September 2024 - Present"
                description={
                  "• Grade: Distinction (predicted)\n• Awards: Bicentenary Global Futures Scholar\n• ECAs: Student Ambassador, UoM DS Club Member\n• Modules include: Machine Learning, Text Mining, Computer Vision and Cognitive Robotics, Modelling Data"
                }
                skills={["Computer Vision", "Algorithms", "Mathematics"]}
                delay={0}
              />
              <ExperienceCard
                title="B.E. in Computer Engineering"
                company="University of Mumbai"
                date="June 2020 - July 2024"
                description={
                  "• Grade: First Class Distinction\n• Awards: All India Smart Hackathon Winners\n• ECAs: College Annual Festival Coordinator, IEEE Club Member\n• Modules include: Database Systems, Data Structures, Operating Systems, Analysis of Algorithm, Cryptography"
                }
                skills={["Programming", "Data Structures", "Mathematics"]}
                delay={0.1}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 md:py-32 bg-muted/50 dark:bg-gray-900/50"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="flex flex-col items-center text-center space-y-4 mb-12 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Get in Touch
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Interested in working together? Feel free to reach out
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-4xl gap-6 place-items-center lg:place-items-stretch">
            <Card>
              <CardContent className="p-6">
                <ContactForm />
              </CardContent>
            </Card>

            <div className="flex flex-col justify-center space-y-6">
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Mail className="h-6 w-6" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">
                    dev.divysolanki@gmail.com
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Linkedin className="h-6 w-6" />
                <div>
                  <h3 className="font-medium">LinkedIn</h3>
                  <p className="text-muted-foreground">
                    linkedin.com/in/thedivysolanki
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Github className="h-6 w-6" />
                <div>
                  <h3 className="font-medium">GitHub</h3>
                  <p className="text-muted-foreground">
                    github.com/DivySolanki
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t dark:border-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Divy Solanki. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
