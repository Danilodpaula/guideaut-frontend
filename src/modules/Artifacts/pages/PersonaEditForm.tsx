// import { Dialog } from "@/components/ui/dialog";
// import { useAuth } from "@/core/auth/AuthContext";
// import { useI18n } from "@/core/i18n/I18nContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

import useAuthGuard from "../hooks/useAuthGuard";

// const PersonaEditForm = () => {
//     const { language } = useI18n();
//     const { isAuthenticated } = useAuth();
//     const navigate = useNavigate();
//     if (!isAuthenticated) {
//         toast.error("Deu erro!");
//         setTimeout(() => {
//             navigate("/login");
//         }, 2000);
//     }

//     const SaveFormDialog = () => {
//         return (
//             <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>
//                             {language === Language.Portuguese
//                                 ? "Salvar Roteiro"
//                                 : "Save Script"}
//                         </DialogTitle>
//                         <DialogDescription>
//                             {language === Language.Portuguese
//                                 ? "Dê um nome para o seu roteiro de entrevista"
//                                 : "Give a name for your interview script"}
//                         </DialogDescription>
//                     </DialogHeader>
//                     <div className="py-4">
//                         <Label htmlFor="roteiro-name" className="text-sm mb-2 block">
//                             {language === Language.Portuguese
//                                 ? "Nome do Roteiro"
//                                 : "Script's name"}
//                         </Label>
//                         <Input
//                             id="roteiro-name"
//                             placeholder={
//                                 language === Language.Portuguese
//                                     ? "Ex: Entrevista inicial - João"
//                                     : "Ex: Initial Interview - John Doe"
//                             }
//                             value={roteiroName}
//                             onChange={(e) => setRoteiroName(e.target.value)}
//                         />
//                     </div>
//                     <DialogFooter>
//                         <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
//                             {language === Language.Portuguese ? "Cancelar" : "Cancel"}
//                         </Button>
//                         <Button onClick={submitAction}>
//                             {language === Language.Portuguese ? "Salvar" : "Save"}
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         )
//     }
//     return (
//     //     <div className="max-w-3xl mx-auto mt-[50px] mb-[50px]">
//     //         <div className="flex items-center justify-between mb-6">
//     //             <Button onClick={() => navigate("/artifacts", { state: { value: "4" } })}>
//     //                 {language === Language.Portuguese ? "Voltar" : "Back"}
//     //             </Button>
//     //         </div>
//     //         <Card ref={contentRef}>
//     //             <CardHeader>
//     //                 <div className="flex items-start justify-between">
//     //                     <div className="flex-1">
//     //                         <CardTitle>
//     //                             {language === Language.Portuguese ? title.pt : title.en}
//     //                         </CardTitle>
//     //                     </div>
//     //                 </div>
//     //             </CardHeader>
//     //             <CardContent>
//     //                 <div className="flex justify-between items-center pb-4">
//     //                     <p>
//     //                         {language === Language.Portuguese ? "Perguntas: " : "Questions: "}
//     //                     </p>
//     //                     <Button
//     //                         onClick={() => {
//     //                             setShowAddQuestionDialog(true);
//     //                         }}
//     //                     >
//     //                         <Plus className="w-4 h-4" />
//     //                         {language === Language.Portuguese
//     //                             ? "Nova Pergunta"
//     //                             : "New Question"}
//     //                     </Button>
//     //                 </div>
//     //                 {allQuestions.map((question) => {
//     //                     return (
//     //                         <div
//     //                             className="p-[10px] border rounded-[10px] mb-[20px] flex justify-between"
//     //                             key={question.id}
//     //                         >
//     //                             <div className="flex flex-col mb-[10px]">
//     //                                 <p className="w-[700px]">
//     //                                     {language === Language.Portuguese
//     //                                         ? question.pt
//     //                                         : question.en}
//     //                                 </p>
//     //                                 {question.section && (
//     //                                     <Section
//     //                                         language={language}
//     //                                         selectedSections={fixedSections}
//     //                                         question={question}
//     //                                     />
//     //                                 )}
//     //                             </div>
//     //                             {question.isFixed ? (
//     //                                 <Badge className="rounded-[10px] h-[30px]">
//     //                                     {language === Language.Portuguese ? "Fixo" : "Fixed"}
//     //                                 </Badge>
//     //                             ) : (
//     //                                 <Button
//     //                                     onClick={() => {
//     //                                         removeQuestion(question.id);
//     //                                     }}
//     //                                 >
//     //                                     <X className="w-3 h-3" />
//     //                                 </Button>
//     //                             )}
//     //                         </div>
//     //                     );
//     //                 })}
//     //             </CardContent>
//     //         </Card>
//     //         <div className="grid grid-cols-2 gap-3 pt-4 border-t">
//     //             <Button
//     //                 variant="default"
//     //                 className="gap-2"
//     //                 onClick={() => {
//     //                     setShowSaveDialog(true);
//     //                 }}
//     //                 disabled={creationPending || creationSuccess}
//     //             >
//     //                 <Save className="w-4 h-4" />
//     //                 {language === Language.Portuguese ? "Salvar" : "Save"}
//     //             </Button>
//     //             <ExportPDFButton
//     //                 language={language}
//     //                 filename="canvas"
//     //                 pageRef={contentRef}
//     //             />
//     //         </div>
//     //     </div>
//     // );
// }

// export default PersonaEditForm;

// {/* <Dialog
//     open={showAddQuestionDialog}
//     onOpenChange={setShowAddQuestionDialog}
// >
//     <DialogContent>
//         <DialogHeader>
//             <DialogTitle>
//                 {language === Language.Portuguese
//                     ? "Adicionar Pergunta"
//                     : "Add Question"}
//             </DialogTitle>
//             <DialogDescription>
//                 {language === Language.Portuguese
//                     ? "Adicione uma nova pergunta ao seu roteiro de entrevista"
//                     : "Add a new question to your interview script"}
//             </DialogDescription>
//         </DialogHeader>
//         <div className="py-4">
//             <Label htmlFor="question-section" className="text-sm mb-2 block">
//                 {language === Language.Portuguese
//                     ? "Seção do Canvas"
//                     : "Canvas' section"}
//             </Label>
//             <Select
//                 value={newQuestionSection}
//                 onValueChange={setNewQuestionSection}
//             >
//                 <SelectTrigger>
//                     <SelectValue
//                         placeholder={
//                             language === Language.Portuguese
//                                 ? "Selecione a seção..."
//                                 : "Select a section..."
//                         }
//                     />
//                 </SelectTrigger>
//                 <SelectContent>
//                     {fixedSections.map((section) => (
//                         <SelectItem key={section.id} value={section.id}>
//                             {language === Language.Portuguese ? section.pt : section.en}
//                         </SelectItem>
//                     ))}
//                 </SelectContent>
//             </Select>
//         </div>
//         <div className="py-4">
//             <Label htmlFor="question-text" className="text-sm mb-2 block">
//                 {language === Language.Portuguese
//                     ? "Texto da Pergunta"
//                     : "Question Text"}
//             </Label>
//             <Input
//                 id="question-text"
//                 placeholder={
//                     language === Language.Portuguese
//                         ? "Adicionar nova pergunta..."
//                         : "Add new question..."
//                 }
//                 value={newQuestionText}
//                 onChange={(e) => setNewQuestionText(e.target.value)}
//             />
//         </div>
//         <DialogFooter>
//             <Button
//                 variant="outline"
//                 onClick={() => setShowAddQuestionDialog(false)}
//             >
//                 {language === Language.Portuguese ? "Cancelar" : "Cancel"}
//             </Button>
//             <Button
//                 onClick={() => {
//                     addQuestion(newQuestionSection, newQuestionText);
//                     setNewQuestionSection("");
//                     setNewQuestionText("");
//                 }}
//                 disabled={!newQuestionSection.trim() && !newQuestionText.trim()}
//             >
//                 {language === Language.Portuguese ? "Adicionar" : "Add"}
//             </Button>
//         </DialogFooter>
//     </DialogContent>
// </Dialog> */}

const PersonaEditForm = () => {
  useAuthGuard();
  return <div></div>;
};

export default PersonaEditForm;
