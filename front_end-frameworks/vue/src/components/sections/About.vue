<script setup>
import { steps } from '../../data/steps'
import SectionBadge from '../ui/SectionBadge.vue'
import SectionTitle from '../ui/SectionTitle.vue'
</script>

<template>
  <section id="about-section" class="relative bg-black py-24">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center">
      <!-- Badge -->
      <SectionBadge symbol="✧" class="text-xs"> What is agentic AI ? </SectionBadge>

      <!-- Title -->
      <div>
        <SectionTitle
          class="text-4xl md:text-5xl"
          top="AI that does more than answer"
          bottom="It acts with purpose"
        />
      </div>

      <!-- Subtitle -->
      <div>
        <p class="max-w-2xl text-left text-sm text-slate-300 md:text-base">
          Agentic AI refers to artificial intelligence systems designed to purpose goals, makes
          decisions, use tools, and adapt their actions across multiple steps. Instead of only
          responding to a single promp, an AI agent can break down a task, plan a strategy, execute
          actions, evaluate results and continue until the objective is reached.
        </p>
      </div>

      <div class="mt-18 grid w-full gap-8 md:grid-cols-2">
        <!-- Traditional/Agentic -->
        <div
          class="flex flex-col gap-4 self-center rounded-3xl border border-slate-800 bg-slate-950 p-8 text-left shadow-xl shadow-slate-950/40"
        >
          <div class="font-bold text-slate-50">Traditional AI</div>
          <div class="text-sm text-slate-400 md:text-base">
            Respond to direct instructions, generates content, answers questions, or analyzes
            information within a limited interaction.
          </div>
          <hr class="border-slate-800" />
          <div class="font-bold text-violet-300">Agentic AI</div>
          <div class="text-sm text-slate-400 md:text-base">
            Understands a goal, chooses actions, uses external tools, followq a plan and adjusts its
            bihavior based on feedback
          </div>
        </div>

        <!-- Steps -->
        <div class="flex flex-col text-left">
          <div v-for="step in steps" :key="step.id" class="flex gap-6">
            <div class="flex flex-col items-center">
              <!-- Round -->
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 font-bold text-slate-50 shadow-lg shadow-violet-500/40"
              >
                {{ step.id }}
              </div>

              <!-- Vertical -->
              <div v-if="step.id !== steps.length" class="w-px flex-1 bg-violet-500" />
            </div>

            <!-- Text -->
            <div :class="step.id !== steps.length ? 'pb-8' : ''">
              <h3 class="text-xl font-bold text-slate-50">
                {{ step.title }}
              </h3>

              <p class="mt-2 text-xs text-slate-300 md:text-sm">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
