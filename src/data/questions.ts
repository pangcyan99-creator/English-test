/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = '初级' | '中级' | '高级';

export type GrammarCategory = 
  | '非谓语动词' 
  | '定语从句' 
  | '状语从句' 
  | '名词性从句' 
  | '连词' 
  | '独立主格' 
  | '虚拟语气';

export interface Question {
  id: number;
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswer: string;
  options: string[];
  explanation: {
    rule: string;
    example: string;
    pitfall: string;
  };
  difficulty: Difficulty;
  category: GrammarCategory;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    sentenceBefore: "",
    sentenceAfter: " tired, she still finished the report.",
    correctAnswer: "Although",
    options: ["Although", "Because", "Unless", "Despite"],
    explanation: {
      rule: "Although 引导让步状语从句，表示“尽管”。",
      example: "Although it was raining, they went out.",
      pitfall: "Despite 后面接名词或动名词，不接句子；Because 表示原因。"
    },
    difficulty: "初级",
    category: "状语从句"
  },
  {
    id: 2,
    sentenceBefore: "The boy ",
    sentenceAfter: " is playing football is my brother.",
    correctAnswer: "who",
    options: ["who", "which", "whom", "whose"],
    explanation: {
      rule: "who 引导定语从句，在从句中作主语，先行词是人。",
      example: "The man who is standing there is our teacher.",
      pitfall: "which 先行词是物；whom 在从句中作宾语。"
    },
    difficulty: "初级",
    category: "定语从句"
  },
  {
    id: 3,
    sentenceBefore: "",
    sentenceAfter: " the homework, the boy went out to play.",
    correctAnswer: "Having finished",
    options: ["Having finished", "Finished", "To finish", "Finish"],
    explanation: {
      rule: "现在分词的完成式 Having done 表示动作发生在主句动作之前。",
      example: "Having seen the movie, I don't want to see it again.",
      pitfall: "Finished 表示被动；To finish 表示目的。"
    },
    difficulty: "高级",
    category: "非谓语动词"
  },
  {
    id: 4,
    sentenceBefore: "I don't know ",
    sentenceAfter: " he will come back tomorrow.",
    correctAnswer: "whether",
    options: ["whether", "that", "what", "which"],
    explanation: {
      rule: "whether 引导宾语从句，表示“是否”，常与 know, wonder 等词连用。",
      example: "I wonder whether it will rain.",
      pitfall: "that 引导宾语从句不表示疑问；what 在从句中需作成分。"
    },
    difficulty: "中级",
    category: "名词性从句"
  },
  {
    id: 5,
    sentenceBefore: "Weather ",
    sentenceAfter: ", we will go for a picnic.",
    correctAnswer: "permitting",
    options: ["permitting", "permitted", "to permit", "permits"],
    explanation: {
      rule: "独立主格结构：名词 + 现在分词，表示条件或伴随。",
      example: "Time permitting, I will visit you.",
      pitfall: "permitted 表示被动；这里 weather 与 permit 是主动关系。"
    },
    difficulty: "高级",
    category: "独立主格"
  },
  {
    id: 6,
    sentenceBefore: "He spoke loudly in order ",
    sentenceAfter: " heard.",
    correctAnswer: "to be",
    options: ["to be", "being", "to have", "been"],
    explanation: {
      rule: "in order to do sth. 表示目的，这里需要用被动语态 to be done。",
      example: "He worked hard in order to be promoted.",
      pitfall: "in order 后面不接 being；heard 是过去分词，前面需助动词 be。"
    },
    difficulty: "中级",
    category: "非谓语动词"
  },
  {
    id: 7,
    sentenceBefore: "This is the house ",
    sentenceAfter: " I lived ten years ago.",
    correctAnswer: "where",
    options: ["where", "which", "that", "when"],
    explanation: {
      rule: "where 引导定语从句，在从句中作地点状语。",
      example: "This is the school where I studied.",
      pitfall: "which/that 在从句中作主语或宾语，而 live 是不及物动词。"
    },
    difficulty: "中级",
    category: "定语从句"
  },
  {
    id: 8,
    sentenceBefore: "If I ",
    sentenceAfter: " you, I would take the advice.",
    correctAnswer: "were",
    options: ["were", "am", "was", "be"],
    explanation: {
      rule: "虚拟语气：对现在的虚拟，if 从句谓语动词用过去式（be 动词一律用 were）。",
      example: "If I were a bird, I could fly.",
      pitfall: "在正式考试中，虚拟语气 be 动词首选 were 而非 was。"
    },
    difficulty: "中级",
    category: "虚拟语气"
  }
];
