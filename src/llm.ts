import type { AIMessage } from '../types';
import { openai } from "./ai";
import { zodFunction } from 'openai/helpers/zod';
import { z } from 'zod';
import { systemPrompt } from './systemPrompt';


export const runLLM = async ({ model = 'gpt-4', messages, temperature = 0.1, tools }: { model?: string, messages: AIMessage[], temperature?: number, tools?: { name: string; parameters: z.AnyZodObject }[] }) => {


  const formattedTools = tools?.map((tool) => zodFunction(tool));


  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.1,
    messages: [{role: 'system', content: systemPrompt}, ...messages],
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false
  })
  return response.choices[0].message
}

