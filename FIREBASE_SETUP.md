# Configuração do Firebase

Este guia explica como configurar o Firebase para autenticação e banco de dados no projeto Blackwolf.

## 1. Instalar o Firebase

```bash
npm install firebase
```

## 2. Criar projeto no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"** (ou use um existente)
3. Siga o assistente para criar o projeto
4. Quando solicitado, ative o **Google Analytics** (opcional)

## 3. Registrar o app Web

1. No projeto, clique no ícone **Web** (`</>`)
2. Registre o app com um nome (ex: "Blackwolf Site")
3. **Não** marque Firebase Hosting por enquanto (se não for usar)
4. Clique em **"Registrar app"**
5. Copie o objeto `firebaseConfig` que aparecer

## 4. Configuração

O projeto usa `lib/firebase/config.ts` com o objeto `firebaseConfig`. As credenciais já estão definidas nesse arquivo.

Se preferir usar variáveis de ambiente, crie `.env.local` e altere `lib/firebase.ts` para usar `process.env.NEXT_PUBLIC_FIREBASE_*`.

## 5. Ativar Authentication

1. No menu lateral, vá em **Build** > **Authentication**
2. Clique em **"Começar"**
3. Em **"Sign-in method"**, ative **"E-mail/senha"**
4. Marque **"E-mail/senha"** e **"Link de e-mail (login sem senha)"** se quiser (o básico é só e-mail/senha)
5. Salve

## 6. Ativar Firestore Database

1. No menu lateral, vá em **Build** > **Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Escolha o modo: **"Começar no modo de teste"** (para desenvolvimento) ou **"Modo de produção"**
4. Selecione a região (ex: `southamerica-east1` para São Paulo)
5. Clique em **"Ativar"**

### Regras de segurança (Firestore)

Para desenvolvimento, você pode usar regras como (admin pode ler todos os usuários):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Usuário lê/escreve seus próprios dados; admin lê todos
      allow read: if request.auth != null && (
        request.auth.uid == userId ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
      allow write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
  }
}
```

## 7. Estrutura do documento do usuário (Firestore)

Cada documento na coleção `users` segue esta estrutura (em inglês):

```json
{
  "email": "string",
  "name": "string",
  "role": "user | admin",
  "document": "string | null",
  "city": "string | null",
  "country": "string | null",
  "phone": "string | null",
  "userType": "string | null",
  "plan": "string | null",
  "createdAt": "ISO string",
  "payment": {
    "method": "boleto | transferencia | null",
    "boletoDocument": "string | null",
    "bank": "string | null",
    "agency": "string | null",
    "account": "string | null",
    "swift": "string | null",
    "iban": "string | null"
  }
}
```

Os dados de pagamento ficam aninhados em `payment` para manter a organização e o BD em inglês (projeto internacional).

## 8. Criar usuário Admin (opcional)

Para ter um admin no sistema:

1. Crie um usuário pelo cadastro do site ou pelo Firebase Console (Authentication > Users > Add user)
2. No Firestore, vá em **users** > documento do usuário (UID)
3. Edite o campo `role` de `"user"` para `"admin"`

## 9. Reiniciar o servidor

Reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

---

**Observação:** Com o `lib/firebase/config.ts` configurado, o Firebase será usado automaticamente. Os dados mock só são usados se o arquivo de configuração estiver vazio ou inválido.
