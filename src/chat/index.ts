export { DOSSIER_VERSION } from "@/chat/types"
export type {
  ChatDossier,
  DossierFact,
  DossierGap,
  DossierLink,
  FaqEntry,
  QuestionClassification,
} from "@/chat/types"
export { ARCHIVE_REFUSAL, chatPolicy } from "@/chat/policy"
export { chatDossier, factById, validateDossier } from "@/chat/dossier"
export { classifyQuestion, normalizeQuestion } from "@/chat/match"
export { renderSystemPrompt } from "@/chat/prompt"
export { refusalCases, refusalIntents } from "@/chat/refusals"
