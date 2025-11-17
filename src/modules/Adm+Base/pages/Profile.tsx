/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/Profile.tsx
// Página de perfil do usuário no GuideAut.
// Clique na foto => abre preview em tela cheia com opções de trocar/remover.

import { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/core/auth/AuthContext";
import { useI18n } from "@/core/i18n/I18nContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  User,
  Mail,
  Shield,
  Loader2,
  Save,
  X,
  Trash2,
  Upload,
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const { language } = useI18n();

  const {
    profile,
    isLoading: profileLoading,
    isSaving,
    updateProfile,
    uploadAvatar,
    deleteAvatar,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // estado do preview (lightbox)
  const [previewOpen, setPreviewOpen] = useState(false);

  /** 🔄 Inicializa campos quando o perfil for carregado */
  useEffect(() => {
    if (profile || user) {
      setDisplayName(profile?.display_name || user?.name || "");
      setBio(profile?.bio || "");
    }
  }, [profile, user?.name]);

  /** 🚫 Redireciona para login se o usuário não estiver autenticado */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /** 🧩 Gera iniciais a partir do nome */
  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  /** 💾 Salva alterações no perfil */
  const handleSaveProfile = async () => {
    await updateProfile({
      display_name: displayName,
      bio,
    });
    setIsEditing(false);
  };

  /** ❌ Cancela edição e restaura valores originais */
  const handleCancelEdit = () => {
    setDisplayName(profile?.display_name || user?.name || "");
    setBio(profile?.bio || "");
    setIsEditing(false);
  };

  /** 📷 Abrir seletor de arquivo (usado no Dialog) */
  const triggerFileSelect = () => fileInputRef.current?.click();

  /** 🖼️ Upload do avatar */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 2 * 1024 * 1024) return; // 2MB

    await uploadAvatar(file);
    // reseta o input pra permitir reenviar a mesma imagem se quiser
    e.target.value = "";
    setPreviewOpen(false); // fecha preview após trocar
  };

  /** 🗑️ Remover avatar */
  const handleRemoveAvatar = async () => {
    await deleteAvatar();
    setPreviewOpen(false);
  };

  /** ⏳ Carregando perfil */
  if (profileLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const avatarSrc = profile?.avatar_url || undefined;
  const initials = displayName ? getInitials(displayName) : "U";

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {language === "pt-BR" ? "Meu Perfil" : "My Profile"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === "pt-BR"
            ? "Visualize e gerencie suas informações pessoais"
            : "View and manage your personal information"}
        </p>
      </div>

      {/* Perfil e dados principais */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Avatar e papel */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>
              {language === "pt-BR" ? "Foto do Perfil" : "Profile Picture"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative group">
              {/* Clique na foto => abre preview */}
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={
                  language === "pt-BR" ? "Ampliar avatar" : "Open avatar"
                }
              >
                <Avatar className="h-32 w-32">
                  <AvatarImage src={avatarSrc} alt={displayName} />
                  <AvatarFallback className="text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold">
                {displayName || user?.name}
              </h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            <Badge
              variant={user?.roles.includes("ADMIN") ? "default" : "secondary"}
            >
              <Shield className="mr-1 h-3 w-3" />
              {user?.roles[0] || "USER"}
            </Badge>
          </CardContent>
        </Card>

        {/* Edição de dados pessoais */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {language === "pt-BR"
                ? "Informações Pessoais"
                : "Personal Information"}
            </CardTitle>
            <CardDescription>
              {language === "pt-BR"
                ? "Suas informações básicas de conta"
                : "Your basic account information"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Nome de exibição */}
              <div className="space-y-2">
                <Label htmlFor="displayName">
                  {language === "pt-BR" ? "Nome de Exibição" : "Display Name"}
                </Label>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={!isEditing}
                    className="flex-1"
                    placeholder={user?.name}
                  />
                </div>
              </div>

              {/* E-mail */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  {language === "pt-BR" ? "E-mail" : "Email"}
                </Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Biografia */}
            <div className="space-y-2">
              <Label htmlFor="bio">
                {language === "pt-BR" ? "Biografia" : "Bio"}
              </Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder={
                  language === "pt-BR"
                    ? "Conte um pouco sobre você..."
                    : "Tell us about yourself..."
                }
                rows={4}
                disabled={!isEditing}
                maxLength={500}
              />
              {isEditing && (
                <p className="text-xs text-muted-foreground">
                  {bio.length}/500{" "}
                  {language === "pt-BR" ? "caracteres" : "characters"}
                </p>
              )}
            </div>

            {/* Ações */}
            <div className="pt-4 border-t flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  {language === "pt-BR" ? "Editar Perfil" : "Edit Profile"}
                </Button>
              ) : (
                <>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <Save className="mr-2 h-4 w-4" />
                    {language === "pt-BR" ? "Salvar" : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                  >
                    <X className="mr-2 h-4 w-4" />
                    {language === "pt-BR" ? "Cancelar" : "Cancel"}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* =======================
          DIALOG DE PREVIEW AVATAR
         ======================= */}

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[960px]">
          <DialogHeader>
            <DialogTitle>
              {language === "pt-BR" ? "Foto do Perfil" : "Profile Picture"}
            </DialogTitle>
          </DialogHeader>

          <div className="w-full">
            <div
              className="
                flex items-center justify-center
                bg-muted/20 rounded-xl border
                p-3
                max-h-[80svh]
              "
            >
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={displayName}
                  className="
                    block
                    h-auto w-auto
                    max-h-[78svh]
                    max-w-[86vw]
                    object-contain
                    select-none
                  "
                  draggable={false}
                />
              ) : (
                <div className="flex items-center justify-center h-[320px]">
                  <Avatar className="h-32 w-32">
                    <AvatarFallback className="text-2xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:justify-between">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={triggerFileSelect}
                disabled={isSaving}
              >
                <Upload className="mr-2 h-4 w-4" />
                {language === "pt-BR" ? "Trocar foto" : "Change photo"}
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={handleRemoveAvatar}
                disabled={isSaving || !avatarSrc}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {language === "pt-BR" ? "Remover foto" : "Remove photo"}
              </Button>
            </div>

            <DialogClose asChild>
              <Button type="button" variant="outline">
                {language === "pt-BR" ? "Fechar" : "Close"}
              </Button>
            </DialogClose>

            {/* input escondido para upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
