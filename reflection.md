# Reflection

This project completely changed how I think about AI systems.

Initially, I assumed that calling an API and giving a simple prompt would be enough to build a good chatbot. However, the early results were very generic and did not reflect any real personality.

The biggest turning point was when I started refining the system prompts. I realized that just saying “you are this person” is not enough. The model needs very specific instructions about tone, behavior, and constraints. Adding few-shot examples made a huge difference, especially in making the responses consistent.

The GIGO principle became very clear during this project. When the prompts were vague, the output was also vague. Once I added structure, examples, and strict instructions, the responses improved significantly.

One interesting challenge was making the personas feel genuinely different. Initially, all three sounded similar. I had to explicitly force differences in tone — making Anshuman more guiding, Abhimanyu more direct, and Kshitij more technical.

If I had more time, I would improve the UI further and possibly add chat history persistence. I would also experiment with more advanced prompt techniques like dynamic memory or context-aware responses.

Overall, this project helped me understand that prompt engineering is not just about writing instructions, but about shaping behavior.