<template>
  <!-- Hero Section -->
  <section class="py-16 bg-gradient-to-br from-brand-50 via-sage-50 to-earth-50">
    <div class="mx-auto max-w-6xl px-4">
      <div class="lg:grid lg:grid-cols-5 lg:gap-12 lg:items-center">
        <!-- Profile Photo -->
        <div class="lg:col-span-2 mb-10 lg:mb-0">
          <div class="relative mx-auto max-w-sm">
            <div class="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img src="/images/cindy-profile.jpg" alt="Cindy Zody" class="w-full h-full object-cover" />
            </div>
            <!-- Decorative elements -->
            <div class="absolute -top-3 -right-3 w-8 h-8 bg-brand-400 rounded-full opacity-80"></div>
            <div class="absolute -bottom-3 -left-3 w-6 h-6 bg-sage-400 rounded-full opacity-80"></div>
            <div class="absolute top-1/3 -left-4 w-4 h-4 bg-earth-400 rounded-full opacity-80"></div>
            <div class="absolute bottom-1/4 -right-2 w-3 h-3 bg-rose-400 rounded-full opacity-80"></div>
          </div>
        </div>

        <!-- Content -->
        <div class="lg:col-span-3">
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Hi, I'm Cindy
          </h1>
          <p class="text-xl text-slate-600 mb-6 leading-relaxed">
            I help people transform conflict into connection. As a communications practitioner,
            I guide individuals, couples, families, and organizations toward more compassionate
            and effective ways of relating.
          </p>
          <p class="text-lg text-slate-600 mb-6 leading-relaxed">
            My approach blends Non-Violent Communication (NVC), Internal Family Systems (IFS),
            mindfulness, and attitudinal healing—creating a framework that honors both the
            complexity of human experience and our fundamental capacity for growth.
          </p>
          <p class="text-lg text-slate-600 mb-8 leading-relaxed">
            I also partner with businesses to transform how teams communicate and collaborate.
            Through my GOFNR approach (Goals, Observation, Feelings, Needs, Request), I help
            organizations resolve workplace conflicts more effectively, optimize sales by
            deeply understanding customer needs, and deliver superior outcomes by integrating
            compassionate communication into everyday practices and team training.
          </p>

          <!-- Quick credentials -->
          <div class="flex flex-wrap gap-3 mb-6">
            <span class="inline-flex items-center px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700">
              <AcademicCapIcon class="w-4 h-4 mr-2 text-brand-600" />
              M.Ed. Curriculum & Instruction
            </span>
            <span class="inline-flex items-center px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700">
              <HeartIcon class="w-4 h-4 mr-2 text-rose-500" />
              NVC Practitioner
            </span>
            <span class="inline-flex items-center px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700">
              <SparklesIcon class="w-4 h-4 mr-2 text-violet-500" />
              IFS-Informed
            </span>
          </div>

          <!-- Contact info at top -->
          <div class="flex flex-wrap gap-4 text-sm text-slate-600">
            <a href="tel:+12069925992" class="flex items-center gap-2 hover:text-brand-600">
              <PhoneIcon class="w-4 h-4" />
              (206) 992-5992
            </a>
            <a href="mailto:cindyzody@gmail.com" class="flex items-center gap-2 hover:text-brand-600">
              <EnvelopeIcon class="w-4 h-4" />
              cindyzody@gmail.com
            </a>
            <span class="flex items-center gap-2">
              <MapPinIcon class="w-4 h-4" />
              Seattle, WA + Remote
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- My Journey Section -->
  <section class="py-16 bg-white">
    <div class="mx-auto max-w-4xl px-4">
      <h2 class="text-3xl font-bold text-center mb-12">My Journey</h2>

      <div class="prose prose-lg prose-slate max-w-none">
        <p>
          My path to this work wasn't straightforward. Like many people, I struggled with conflict
          for years—sometimes avoiding it entirely, other times engaging in ways that left everyone
          feeling worse. I knew there had to be a better way, but I didn't know what it looked like.
        </p>

        <p>
          Discovering Non-Violent Communication was a turning point. For the first time, I had a
          framework that made sense of my experience. I began to understand that beneath every
          conflict are unmet needs—universal human needs that we all share. This wasn't about
          being "nice" or suppressing my truth. It was about finding ways to honor everyone's
          needs, including my own.
        </p>

        <p>
          My training in education gave me tools for creating learning environments where people
          feel safe to grow. Internal Family Systems deepened my understanding of the complexity
          within each of us—how different parts of ourselves can hold conflicting needs and how
          healing happens when all parts feel heard. Mindfulness practice taught me the importance
          of presence: we can't truly hear others if we're not first grounded in ourselves.
        </p>

        <p>
          Today, I bring all of these threads together in my work. Whether I'm sitting with an
          individual exploring their internal landscape, facilitating a difficult conversation
          between partners, or leading a workshop for a team, my goal is the same: to create
          conditions where genuine understanding becomes possible.
        </p>
      </div>
    </div>
  </section>

  <!-- Philosophy Section -->
  <section class="py-16 bg-sage-50">
    <div class="mx-auto max-w-6xl px-4">
      <h2 class="text-3xl font-bold text-center mb-4">What I Believe</h2>
      <p class="text-center text-slate-600 max-w-2xl mx-auto mb-12">
        These principles guide every session, workshop, and interaction.
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-sage-100">
          <div class="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
            <HeartIcon class="w-6 h-6 text-brand-600" />
          </div>
          <h3 class="font-semibold text-lg mb-2">Everyone has good reasons</h3>
          <p class="text-slate-600 text-sm">
            Behind every behavior—even the ones that hurt—are valid human needs. When we
            understand this, judgment gives way to curiosity.
          </p>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-sage-100">
          <div class="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
            <ChatBubbleLeftRightIcon class="w-6 h-6 text-rose-600" />
          </div>
          <h3 class="font-semibold text-lg mb-2">Connection before correction</h3>
          <p class="text-slate-600 text-sm">
            People can only hear feedback after they feel heard. Building connection isn't
            a detour from solving problems—it's the path.
          </p>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-sage-100">
          <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
            <LightBulbIcon class="w-6 h-6 text-amber-600" />
          </div>
          <h3 class="font-semibold text-lg mb-2">Clarity creates compassion</h3>
          <p class="text-slate-600 text-sm">
            When we can clearly see what we need and what others need, compassion becomes
            natural. Most cruelty comes from confusion, not malice.
          </p>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-sage-100">
          <div class="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
            <SparklesIcon class="w-6 h-6 text-violet-600" />
          </div>
          <h3 class="font-semibold text-lg mb-2">All parts are welcome</h3>
          <p class="text-slate-600 text-sm">
            Healing doesn't come from silencing the parts of ourselves we don't like. It
            comes from understanding them with curiosity and care.
          </p>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-sage-100">
          <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <ArrowPathIcon class="w-6 h-6 text-teal-600" />
          </div>
          <h3 class="font-semibold text-lg mb-2">Progress over perfection</h3>
          <p class="text-slate-600 text-sm">
            This work isn't about getting it right every time. It's about building awareness,
            practicing repair, and growing through experience.
          </p>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-sage-100">
          <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <UserGroupIcon class="w-6 h-6 text-indigo-600" />
          </div>
          <h3 class="font-semibold text-lg mb-2">Skills can be learned</h3>
          <p class="text-slate-600 text-sm">
            Compassionate communication isn't a personality trait—it's a skill set. Anyone
            willing to practice can develop these capabilities.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Training & Background -->
  <section class="py-16 bg-white">
    <div class="mx-auto max-w-6xl px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Training & Background</h2>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Education -->
        <div class="bg-gradient-to-br from-brand-50 to-sage-50 rounded-xl p-8 border border-brand-100">
          <h3 class="text-xl font-semibold mb-6 flex items-center gap-2">
            <AcademicCapIcon class="w-6 h-6 text-brand-600" />
            Education
          </h3>
          <div class="space-y-4">
            <div>
              <div class="font-medium">Master of Education</div>
              <div class="text-sm text-slate-600">Curriculum & Instruction</div>
            </div>
            <div>
              <div class="font-medium">Non-Violent Communication Training</div>
              <div class="text-sm text-slate-600">Extensive NVC study and practice</div>
            </div>
            <div>
              <div class="font-medium">Internal Family Systems</div>
              <div class="text-sm text-slate-600">IFS-Informed Practitioner Training</div>
            </div>
            <div>
              <div class="font-medium">Mindfulness-Based Approaches</div>
              <div class="text-sm text-slate-600">Ongoing practice and study</div>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div class="bg-gradient-to-br from-earth-50 to-rose-50 rounded-xl p-8 border border-earth-100">
          <h3 class="text-xl font-semibold mb-6 flex items-center gap-2">
            <BriefcaseIcon class="w-6 h-6 text-earth-600" />
            Experience
          </h3>
          <div class="space-y-4">
            <div>
              <div class="font-medium">15+ Years</div>
              <div class="text-sm text-slate-600">Working with individuals and groups</div>
            </div>
            <div>
              <div class="font-medium">500+ Clients</div>
              <div class="text-sm text-slate-600">Individuals, couples, and families served</div>
            </div>
            <div>
              <div class="font-medium">Workshop Facilitation</div>
              <div class="text-sm text-slate-600">Organizations, schools, and community groups</div>
            </div>
            <div>
              <div class="font-medium">Mediation & Facilitation</div>
              <div class="text-sm text-slate-600">Workplace and family conflict resolution</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Beyond Work Section -->
  <section class="py-16 bg-slate-50">
    <div class="mx-auto max-w-4xl px-4">
      <h2 class="text-3xl font-bold text-center mb-4">Beyond the Work</h2>
      <p class="text-center text-slate-600 max-w-2xl mx-auto mb-10">
        When I'm not facilitating conversations or leading workshops, you'll find me...
      </p>

      <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl p-5 text-center border">
          <div class="text-3xl mb-2">🌲</div>
          <div class="text-sm text-slate-600">Hiking Pacific Northwest trails</div>
        </div>
        <div class="bg-white rounded-xl p-5 text-center border">
          <div class="text-3xl mb-2">📚</div>
          <div class="text-sm text-slate-600">Reading about psychology and healing</div>
        </div>
        <div class="bg-white rounded-xl p-5 text-center border">
          <div class="text-3xl mb-2">🧘</div>
          <div class="text-sm text-slate-600">Practicing meditation and yoga</div>
        </div>
        <div class="bg-white rounded-xl p-5 text-center border">
          <div class="text-3xl mb-2">☕</div>
          <div class="text-sm text-slate-600">Enjoying Seattle's coffee culture</div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-16 bg-white">
    <div class="mx-auto max-w-4xl px-4">
      <div class="bg-gradient-to-br from-brand-50 via-sage-50 to-earth-50 rounded-2xl p-8 md:p-12 text-center border border-brand-100">
        <h2 class="text-3xl font-bold mb-4">Let's Work Together</h2>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Whether you're navigating a difficult relationship, seeking personal growth,
          or looking to transform your organization's communication culture—I'd love
          to explore how I can support you.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <RouterLink
            to="/contact"
            class="inline-flex items-center bg-brand-600 text-white px-8 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium"
          >
            Schedule a Consultation
            <ArrowRightIcon class="w-5 h-5 ml-2" />
          </RouterLink>
          <RouterLink
            to="/services"
            class="inline-flex items-center border border-slate-300 bg-white px-8 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            Explore Services
          </RouterLink>
        </div>

        <!-- Contact info -->
        <div class="mt-8 pt-8 border-t border-brand-200 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
          <a href="tel:+12069925992" class="flex items-center gap-2 hover:text-brand-600">
            <PhoneIcon class="w-4 h-4" />
            (206) 992-5992
          </a>
          <a href="mailto:cindyzody@gmail.com" class="flex items-center gap-2 hover:text-brand-600">
            <EnvelopeIcon class="w-4 h-4" />
            cindyzody@gmail.com
          </a>
          <span class="flex items-center gap-2">
            <MapPinIcon class="w-4 h-4" />
            Seattle, WA + Remote
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  AcademicCapIcon,
  HeartIcon,
  SparklesIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  ArrowPathIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/vue/24/outline'
</script>
