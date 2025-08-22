<template>
  <footer class="bg-slate-50 border-t border-slate-200">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid gap-8 md:grid-cols-3">
        <div>
          <img src="/src/assets/logo.svg" class="h-10" alt="logo" />
          <p class="mt-3 text-sm text-slate-600">
            Creating healing relationships — one moment at a time.
          </p>
        </div>
        <div>
          <h3 class="font-semibold">Contact</h3>
          <p class="mt-2 text-sm">
            <a class="hover:text-brand-600" href="tel:+12069925992">(206) 992-5992</a><br />
            <a class="hover:text-brand-600" href="tel:+14254861103">(425) 486-1103</a><br />
            <a class="hover:text-brand-600" href="mailto:cindyzody@gmail.com">cindyzody@gmail.com</a>
          </p>
        </div>
        <div>
          <h3 class="font-semibold">Pages</h3>
          <ul class="mt-2 space-y-1 text-sm">
            <li><RouterLink to="/services">Services</RouterLink></li>
            <li><RouterLink to="/approach">Approach</RouterLink></li>
            <li><RouterLink to="/practice">AI Practice</RouterLink></li>
            <li><RouterLink to="/groups">Groups & Workshops</RouterLink></li>
            <li><RouterLink to="/resources">Resources</RouterLink></li>
            <li><RouterLink to="/privacy">Privacy</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 text-xs text-slate-500">
        © {{ new Date().getFullYear() }} Cindy Zody. All rights reserved.
      </div>
    </div>
  </footer>
</template>