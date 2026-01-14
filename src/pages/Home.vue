<template>
  <!-- Modern Hero Section -->
  <section class="relative overflow-hidden bg-white">
    <!-- Nature Background -->
    <div class="absolute inset-0">
      <!-- Background Image with Nature Photo -->
      <div class="absolute inset-0 bg-gradient-to-br from-brand-50 via-sage-50 to-earth-50">
        <!-- Nature background image -->
        <img src="/images/nature-background.jpg" alt="" class="w-full h-full object-cover opacity-20" />
      </div>
      <!-- Organic leaf pattern overlay -->
      <svg class="absolute top-0 right-0 w-64 h-64 text-brand-100 opacity-30" fill="currentColor" viewBox="0 0 100 100">
        <path d="M85 20c-5-5-15-10-25-5-8 4-12 15-10 25 2 8 8 15 15 18 8 3 18 2 25-5 5-5 8-15 5-25-2-8-8-12-10-8z"/>
        <path d="M25 60c-3-8-12-12-20-8-6 3-8 12-5 18 2 5 7 8 12 9 6 1 12-1 15-7 2-4 1-9-2-12z"/>
        <path d="M70 75c-2-4-7-6-11-4-3 1-4 6-2 9 1 2 3 4 6 4 3 0 6-1 7-4 1-2 1-4 0-5z"/>
      </svg>
      <!-- Additional nature elements -->
      <svg class="absolute bottom-0 left-0 w-48 h-48 text-sage-200 opacity-40" fill="currentColor" viewBox="0 0 100 100">
        <circle cx="20" cy="80" r="15"/>
        <circle cx="45" cy="85" r="10"/>
        <circle cx="70" cy="78" r="12"/>
        <path d="M10 90c0-10 10-20 20-20s20 10 20 20"/>
      </svg>
    </div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Floating Profile Photo (Desktop) -->
      <div class="hidden lg:block absolute top-8 right-8 xl:right-16 z-20">
        <div class="relative">
          <div class="w-32 h-32 xl:w-40 xl:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img src="/images/cindy-profile.jpg" alt="Cindy Zody" class="w-full h-full object-cover" />
          </div>
          <!-- Decorative elements around photo -->
          <div class="absolute -top-1 -right-1 w-4 h-4 bg-brand-400 rounded-full"></div>
          <div class="absolute -bottom-1 -left-1 w-3 h-3 bg-sage-400 rounded-full"></div>
          <div class="absolute top-1/4 -left-2 w-2 h-2 bg-earth-400 rounded-full"></div>
        </div>
      </div>

      <div class="pt-16 pb-20 md:pt-20 md:pb-28">
        <div class="mx-auto max-w-7xl">
          <div class="lg:grid lg:grid-cols-12 lg:gap-8">
            <div class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left lg:flex lg:items-center">
              <div>
                <!-- Badge -->
                <div class="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800">
                  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  New: AI-Powered Practice Available
                </div>

                <!-- Main Heading -->
                <h1 class="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span class="block">Compassionate</span>
                  <span class="block text-brand-600">Communication</span>
                  <span class="block">& Healing</span>
                </h1>

                <!-- Description -->
                <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Transform your relationships through Nonviolent Communication (NVC) and Internal Family Systems (IFS).
                  Expert facilitation for individuals, couples, families, and organizations.
                </p>

                <!-- CTA Buttons -->
                <div class="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <div class="flex flex-col sm:flex-row gap-3">
                    <RouterLink
                      to="/contact"
                      class="inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-colors"
                    >
                      Schedule Consultation
                      <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </RouterLink>
                    <RouterLink
                      to="/practice"
                      class="inline-flex items-center justify-center rounded-md border border-brand-300 bg-white px-6 py-3 text-base font-medium text-brand-700 shadow-sm hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-colors"
                    >
                      Try AI Practice
                      <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </RouterLink>
                  </div>
                  <p class="mt-3 text-sm text-gray-500">
                    "Creating healing relationships — one moment at a time."
                  </p>
                </div>
              </div>
            </div>

            <!-- Hero Stats/Info Side (Desktop) + Mobile Profile Photo -->
            <div class="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-5 lg:flex lg:items-center">
              <div class="relative mx-auto w-full rounded-lg lg:max-w-sm xl:max-w-md">
                <!-- Profile Photo (Mobile Only) -->
                <div class="relative mb-6 lg:hidden">
                  <div class="mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img src="/images/cindy-profile.jpg" alt="Cindy Zody" class="w-full h-full object-cover" />
                  </div>
                  <!-- Decorative elements around photo -->
                  <div class="absolute -top-2 -right-2 w-6 h-6 bg-brand-400 rounded-full"></div>
                  <div class="absolute -bottom-1 -left-1 w-4 h-4 bg-sage-400 rounded-full"></div>
                  <div class="absolute top-1/4 -left-3 w-3 h-3 bg-earth-400 rounded-full"></div>
                </div>

                <!-- Stats Card -->
                <div class="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-sage-200 p-6">
                  <div class="space-y-4">
                    <!-- Credentials -->
                    <div class="flex items-start space-x-3">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-lg bg-sage-100 flex items-center justify-center">
                          <svg class="h-5 w-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      </div>
                      <div class="min-w-0">
                        <p class="text-sm font-medium text-gray-900 leading-tight">M.Ed. Curriculum & Instruction</p>
                        <p class="text-sm text-gray-500 leading-tight mt-0.5">Certified NVC/IFS Facilitator</p>
                      </div>
                    </div>

                    <!-- Contact Info -->
                    <div class="bg-sage-50 rounded-lg p-4 border border-sage-200">
                      <div class="space-y-2">
                        <div class="flex items-center space-x-2 text-sm">
                          <svg class="h-4 w-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href="tel:+12069925992" class="text-sage-700 hover:text-sage-800 font-medium">(206) 992-5992</a>
                        </div>
                        <div class="flex items-center space-x-2 text-sm">
                          <svg class="h-4 w-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a href="mailto:cindyzody@gmail.com" class="text-sage-700 hover:text-sage-800 font-medium">cindyzody@gmail.com</a>
                        </div>
                        <div class="flex items-center space-x-2 text-sm">
                          <svg class="h-4 w-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span class="text-sage-700">Seattle, WA + Remote</span>
                        </div>
                      </div>
                    </div>

                    <!-- Quick Stats -->
                    <div class="grid grid-cols-2 gap-4 pt-2">
                      <div class="text-center p-3 bg-brand-50 rounded-lg">
                        <div class="text-2xl font-bold text-brand-600">15+</div>
                        <div class="text-sm text-gray-600">Years Experience</div>
                      </div>
                      <div class="text-center p-3 bg-brand-50 rounded-lg">
                        <div class="text-2xl font-bold text-brand-600">500+</div>
                        <div class="text-sm text-gray-600">Clients Helped</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Overview Section -->
  <section class="py-16 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          How I Can Support You
        </h2>
        <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Specialized facilitation and coaching for transformative communication and healing relationships
        </p>
      </div>

      <div class="mt-16">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Individual Coaching -->
          <div class="group relative bg-white rounded-2xl border border-sage-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div class="absolute -top-4 left-8">
              <div class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mt-4">Individual Coaching</h3>
            <p class="mt-3 text-gray-600">
              Cultivate self-connection, resilience, and communication skills rooted in needs and values through personalized NVC and IFS work.
            </p>
            <div class="mt-6">
              <ul class="space-y-2 text-sm text-gray-500">
                <li class="flex items-center">
                  <svg class="h-4 w-4 text-brand-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Self-awareness & emotional regulation
                </li>
                <li class="flex items-center">
                  <svg class="h-4 w-4 text-brand-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Needs-based communication
                </li>
                <li class="flex items-center">
                  <svg class="h-4 w-4 text-brand-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Internal Family Systems work
                </li>
              </ul>
            </div>
          </div>

          <!-- Couples & Families -->
          <div class="group relative bg-white rounded-2xl border border-sage-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div class="absolute -top-4 left-8">
              <div class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sage-600 text-white">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mt-4">Couples & Families</h3>
            <p class="mt-3 text-gray-600">
              Move from reactivity to empathy, develop shared understanding, and repair trust through guided relationship healing.
            </p>
            <div class="mt-6">
              <ul class="space-y-2 text-sm text-gray-500">
                <li class="flex items-center">
                  <svg class="h-4 w-4 text-sage-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Conflict transformation
                </li>
                <li class="flex items-center">
                  <svg class="h-4 w-4 text-sage-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Empathic listening skills
                </li>
                <li class="flex items-center">
                  <svg class="h-4 w-4 text-sage-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Trust repair & rebuilding
                </li>
              </ul>
            </div>
          </div>

          <!-- Organizations -->
          <div class="group relative bg-white rounded-2xl border border-sage-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div class="absolute -top-4 left-8">
              <div class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-earth-600 text-white">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mt-4">Organizations</h3>
            <p class="mt-3 text-gray-600">
              Workshops and coaching for compassionate cultures, conflict resolution, and collaborative teams that thrive.
            </p>
            <div class="mt-6">
              <ul class="space-y-2 text-sm text-gray-500">
                <li class="flex items-center">
                  <svg class="h-4 w-4 text-earth-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Team communication workshops
                </li>
                <li class="flex items-center">
                  <svg class="h-4 w-4 text-earth-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Leadership coaching
                </li>
                <li class="flex items-center">
                  <svg class="h-4 w-4 text-earth-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Culture transformation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- AI Practice Feature Section -->
  <section class="py-16 bg-gradient-to-r from-sage-50 to-brand-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div>
          <div class="inline-flex items-center rounded-full bg-brand-600 px-3 py-1 text-sm font-medium text-white">
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            New Feature
          </div>
          <h2 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Practice NVC with AI Guidance
          </h2>
          <p class="mt-4 text-lg text-gray-600">
            Our AI facilitator provides 24/7 practice opportunities, guiding you through real NVC conversations
            and offering personalized feedback in a safe, judgment-free environment.
          </p>
          <div class="mt-8">
            <RouterLink
              to="/practice"
              class="inline-flex items-center rounded-md bg-brand-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-colors"
            >
              Try AI Practice
              <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>
          </div>
        </div>
        <div class="mt-8 lg:mt-0">
          <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-sage-200">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full bg-brand-600 flex items-center justify-center">
                  <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-sm font-medium text-gray-900">AI Facilitator</div>
                <div class="text-xs text-gray-500 mb-3">Available 24/7 for practice</div>
                <div class="bg-sage-50 rounded-lg p-4 border border-sage-200">
                  <p class="text-sm text-gray-700">
                    "I notice you're feeling frustrated about the conversation with your colleague.
                    Let's explore what needs weren't met for you in that interaction."
                  </p>
                </div>
                <div class="mt-3 flex space-x-2">
                  <button class="inline-flex items-center px-3 py-1 border border-sage-300 shadow-sm text-xs font-medium rounded-md text-sage-700 bg-white hover:bg-sage-50">
                    Continue Practice
                  </button>
                  <button class="inline-flex items-center px-3 py-1 border border-sage-300 shadow-sm text-xs font-medium rounded-md text-sage-700 bg-white hover:bg-sage-50">
                    New Scenario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Call to Action Section -->
  <section class="py-16 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-br from-sage-50 via-brand-50 to-earth-50 rounded-3xl px-6 py-16 sm:p-16 border border-sage-200">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to Transform Your Relationships?
          </h2>
          <p class="mt-4 text-lg leading-6 text-gray-600">
            Schedule a consultation to discuss how NVC and IFS can support your personal growth,
            relationship healing, or organizational transformation.
          </p>
          <div class="mt-8">
            <ScheduleAppointment variant="inline" />
          </div>
          <div class="mt-6 flex justify-center space-x-6 text-sm text-gray-600">
            <div class="flex items-center">
              <svg class="h-4 w-4 text-brand-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Free consultation available
            </div>
            <div class="flex items-center">
              <svg class="h-4 w-4 text-sage-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Remote sessions available
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ScheduleAppointment from '../components/ScheduleAppointment.vue'
</script>