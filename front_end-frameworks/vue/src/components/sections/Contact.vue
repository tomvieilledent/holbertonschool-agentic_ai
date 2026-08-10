<script setup>
import { reactive, ref, computed } from 'vue'
import { FolderCode, Users, Sparkles, User, AtSign, Mail } from 'lucide-vue-next'
import SectionBadge from '../ui/SectionBadge.vue'
import SectionTitle from '../ui/SectionTitle.vue'
import Button from '../ui/Button.vue'

const DEFAULT_FEEDBACK = 'Fill in the form and we will get back to you shortly.'

/* Form data, sending state and dynamic feedback message. */
const formData = reactive({
  fullName: '',
  email: '',
  message: '',
})
const isSending = ref(false)
const feedback = ref(DEFAULT_FEEDBACK)
const focusedField = ref(null)

/* Basic frontend validation (must also be done on the backend in real apps). */
const isNameValid = computed(() => formData.fullName.trim().length >= 2)
const isEmailValid = computed(() => formData.email.includes('@') && formData.email.includes('.'))
const isMessageValid = computed(() => formData.message.trim().length >= 10)
const isFormValid = computed(() => isNameValid.value && isEmailValid.value && isMessageValid.value)

/* Border color only changes while the field is focused. */
function fieldBorderClass(fieldName, isValid) {
  if (focusedField.value !== fieldName) {
    return 'border-slate-800'
  }
  return isValid ? 'border-violet-500' : 'border-red-500'
}

async function handleSubmit() {
  isSending.value = true
  feedback.value = 'Sending your message...'

  /* Simulate a network request with a short delay. */
  await new Promise((resolve) => setTimeout(resolve, 1500))

  formData.fullName = ''
  formData.email = ''
  formData.message = ''
  isSending.value = false
  feedback.value = 'Message sent! We will reply to you soon.'

  /* Return to the default instruction after a short delay. */
  setTimeout(() => {
    feedback.value = DEFAULT_FEEDBACK
  }, 4000)
}
</script>

<template>
  <section id="contact-section" class="relative bg-black py-24">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center">
      <!-- Badge -->
      <SectionBadge symbol="✧" class="text-sm font-medium"> Start your AI journey ? </SectionBadge>

      <!-- Title -->
      <div>
        <SectionTitle class="text-5xl md:text-7xl" top="Ready to Explore" bottom="Agentic AI ?" />
      </div>

      <!-- CTA -->
      <div class="flex flex-col items-center gap-4 sm:flex-row">
        <Button
          href="https://www.holbertonschool.fr/rejoindre-lhippocamp"
          external
          class="text-sm md:text-base"
        >
          Enroll at Holberton School ➔
        </Button>

        <Button href="#features-section" variant="secondary" class="text-sm md:text-base">
          Need more information ?
        </Button>
      </div>

      <!-- Highlights -->
      <div class="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
        <div class="flex items-center gap-2">
          <FolderCode class="text-violet-500" :size="16" />
          <span class="text-slate-400">Project-based learning</span>
        </div>

        <div class="flex items-center gap-2">
          <Users class="text-violet-500" :size="16" />
          <span class="text-slate-400">Peer learning environment</span>
        </div>

        <div class="flex items-center gap-2">
          <Sparkles class="text-violet-500" :size="16" />
          <span class="text-slate-400">AI-powered workflows</span>
        </div>
      </div>

      <!-- Contact Form -->
      <div
        class="mt-8 w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur"
      >
        <form autocomplete="off" class="flex flex-col gap-6" @submit.prevent="handleSubmit">
          <!-- Full name -->
          <div class="text-left">
            <label for="fullName" class="mb-2 flex items-center gap-2 font-semibold text-slate-50">
              <User class="h-5 w-5 text-violet-500" />
              Full name
            </label>

            <input
              id="fullName"
              v-model="formData.fullName"
              name="fullName"
              type="text"
              autocomplete="off"
              placeholder="Your full name..."
              class="w-full rounded-lg border bg-black px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none"
              :class="fieldBorderClass('fullName', isNameValid)"
              @focus="focusedField = 'fullName'"
              @blur="focusedField = null"
            />
          </div>

          <!-- Email -->
          <div class="text-left">
            <label for="email" class="mb-2 flex items-center gap-2 font-semibold text-slate-50">
              <AtSign class="h-5 w-5 text-violet-500" />
              Email
            </label>

            <input
              id="email"
              v-model="formData.email"
              name="email"
              type="email"
              autocomplete="off"
              placeholder="you@example.com"
              class="w-full rounded-lg border bg-black px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none"
              :class="fieldBorderClass('email', isEmailValid)"
              @focus="focusedField = 'email'"
              @blur="focusedField = null"
            />
          </div>

          <!-- Message -->
          <div class="text-left">
            <label for="message" class="mb-2 flex items-center gap-2 font-semibold text-slate-50">
              <Mail class="h-5 w-5 text-violet-500" />
              Message
            </label>

            <textarea
              id="message"
              v-model="formData.message"
              name="message"
              :rows="5"
              autocomplete="off"
              placeholder="Tell us about your project or learning goals..."
              class="w-full resize-none rounded-lg border bg-black px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none"
              :class="fieldBorderClass('message', isMessageValid)"
              @focus="focusedField = 'message'"
              @blur="focusedField = null"
            />
          </div>

          <!-- Button -->
          <button
            type="submit"
            :disabled="!isFormValid || isSending"
            class="rounded-lg bg-violet-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ isSending ? 'Sending...' : 'Send message' }}
          </button>

          <!-- Feedback message -->
          <p class="text-center text-sm text-slate-400">
            {{ feedback }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
