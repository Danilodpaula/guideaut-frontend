// Profile.tsx
// Página de perfil do usuário no GuideAut.
// Permite visualizar e editar informações pessoais, alterar o avatar,
// e acompanhar as atividades recentes registradas na plataforma.

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/core/auth/AuthContext";
import { useI18n } from "@/core/i18n/I18nContext";
import { useProfile } from "@/hooks/useProfile";
import { useActivityLogs } from "@/hooks/useActivityLogs";
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
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Shield,
  Loader2,
  Camera,
  Save,
  X,
} from "lucide-react";
import { Navigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";

/**
 * 👤 Componente de Perfil de Usuário
 * - Exibe dados do usuário logado (nome, email, papel)
 * - Permite editar nome de exibição e biografia
 * - Suporta upload de imagem de perfil com validação
 * - Lista as últimas atividades registradas
 */
export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const { language } = useI18n();
  const {
    profile,
    isLoading: profileLoading,
    isSaving,
    updateProfile,
    uploadAvatar,
  } = useProfile();
  const {
    activities,
    isLoading: activitiesLoading,
    getActivityIcon,
    getActivityDescription,
  } = useActivityLogs(5);

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** 🔄 Inicializa campos quando o perfil for carregado */
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || user?.name || "");
      setBio(profile.bio || "");
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

  /** 📷 Aciona seletor de arquivo para upload de avatar */
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  /** 🖼️ Faz upload da nova imagem de perfil com validações */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return; // Apenas imagens
    if (file.size > 2 * 1024 * 1024) return; // Máximo 2MB

    await uploadAvatar(file);
  };

  /** 🕒 Formata data para exibição amigável */
  const formatDate = (dateString: string) => {
    const locale = language === "pt-BR" ? ptBR : enUS;
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale,
    });
  };

  /** ⏳ Estado de carregamento do perfil */
  if (profileLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={profile?.avatar_url || undefined}
                  alt={displayName}
                />
                <AvatarFallback className="text-2xl">
                  {displayName ? getInitials(displayName) : "U"}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={handleAvatarClick}
                disabled={isSaving}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {isSaving ? (
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                ) : (
                  <Camera className="h-6 w-6 text-white" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold">
                {displayName || user?.name}
              </h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            <Badge
              variant={
                user?.roles.includes("ADMIN") ? "default" : "secondary"
              }
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
                  {language === "pt-BR"
                    ? "Nome de Exibição"
                    : "Display Name"}
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
                  {language === "pt-BR"
                    ? "caracteres"
                    : "characters"}
                </p>
              )}
            </div>

            {/* Ações */}
            <div className="pt-4 border-t flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  {language === "pt-BR"
                    ? "Editar Perfil"
                    : "Edit Profile"}
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

      {/* Histórico de atividades */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === "pt-BR"
              ? "Atividade Recente"
              : "Recent Activity"}
          </CardTitle>
          <CardDescription>
            {language === "pt-BR"
              ? "Suas últimas ações na plataforma"
              : "Your recent actions on the platform"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activitiesLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {language === "pt-BR"
                ? "Nenhuma atividade recente registrada"
                : "No recent activity recorded"}
            </p>
          ) : (
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {getActivityIcon(
                        activity.action,
                        activity.entity_type
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        {getActivityDescription(
                          activity.action,
                          activity.entity_type,
                          language
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(activity.created_at)}
                      </p>
                    </div>
                  </div>
                  {index < activities.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
