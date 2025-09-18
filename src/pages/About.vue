<template>
  <section class="py-14 bg-gradient-to-br from-brand-50 via-sage-50 to-earth-50">
    <div class="mx-auto max-w-5xl px-4">
      <div class="lg:grid lg:grid-cols-3 lg:gap-12 lg:items-start">
        <!-- Profile Photo -->
        <div class="mb-8 lg:mb-0">
          <div class="relative mx-auto w-64 h-64 lg:w-full lg:h-80">
            <div class="w-full h-full rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/cindy-profile.jpg" alt="Cindy Zody" class="w-full h-full object-cover" />
            </div>
            <!-- Decorative elements -->
            <div class="absolute -top-2 -right-2 w-6 h-6 bg-brand-400 rounded-full opacity-80"></div>
            <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-sage-400 rounded-full opacity-80"></div>
            <div class="absolute top-1/4 -left-3 w-3 h-3 bg-earth-400 rounded-full opacity-80"></div>
          </div>
        </div>

        <!-- Content -->
        <div class="lg:col-span-2">
          <div class="prose prose-slate max-w-none">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-6">About Cindy</h1>
            <div class="text-lg leading-relaxed space-y-4">
              <p>M.Ed. in Curriculum & Instruction. Communications practitioner and facilitator serving individuals, couples, families, and groups. My work blends NVC, IFS-informed parts awareness, mindfulness, and attitudinal healing to invite compassion and clarity.</p>
              <p>Based in Seattle, WA and working remotely as desired.</p>
            </div>

            <!-- Additional professional info -->
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Specializations</h3>
                <ul class="text-gray-600 space-y-1 text-sm">
                  <li>• Nonviolent Communication (NVC)</li>
                  <li>• Internal Family Systems (IFS)</li>
                  <li>• Mindfulness practices</li>
                  <li>• Conflict resolution</li>
                </ul>
              </div>
              <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Services</h3>
                <ul class="text-gray-600 space-y-1 text-sm">
                  <li>• Individual sessions</li>
                  <li>• Couples facilitation</li>
                  <li>• Family mediation</li>
                  <li>• Group workshops</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>