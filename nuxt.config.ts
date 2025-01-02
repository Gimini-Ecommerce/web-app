// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', "@nuxt/ui"],
  supabase: {
    url: "https://hylcpgzldsyajdctayqa.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bGNwZ3psZHN5YWpkY3RheXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5Mjg5NjksImV4cCI6MjA0NzUwNDk2OX0.7IWGV10ZMtyfBJxFHanhDKDlpdjKisb2xnyvbfZcZB0",
    redirect: true,
    redirectOptions: {
      login: "/",
      callback: "/confirm",
      include: ["/"],
      exclude: ["/dashboard"],
      cookieRedirect: false,
    },
    cookieName: "sb-access-token",
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: "lax",
      secure: true,
    },
    clientOptions: {
      auth: {
        flowType: "pkce",
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  },
})