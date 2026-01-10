import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "./_components/SignInForm";
import { SignUpForm } from "./_components/SignUpForm";

export default async function AuthenticationPage() {
    return (
        <main>
            <Tabs defaultValue="signIn">
                <TabsList>
                    <TabsTrigger value="signIn">Entrar</TabsTrigger>
                    <TabsTrigger value="signUp">Registrar-se</TabsTrigger>
                </TabsList>

                 <TabsContent value="signIn">
                    <SignInForm />
                 </TabsContent>

                 <TabsContent value="signUp">
                    <SignUpForm />
                 </TabsContent>
            </Tabs>
        </main>
    )
}