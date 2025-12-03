// app.js – Wellness Pilot front-end logic
// Handles: mobile nav toggle, onboarding wizard navigation, and summary preview.

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------
    // MOBILE NAV TOGGLE
    // -------------------------
    const menuToggle = document.querySelector('.nav-toggle, .menu-toggle, .header-menu-toggle');
    const navContainer = document.querySelector('.header-nav, .nav-links, .main-nav');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            navContainer.classList.toggle('is-open');
            menuToggle.classList.toggle('is-open');
            document.body.classList.toggle('nav-open');
        });
    }

    // Close nav when clicking a link (mobile)
    if (navContainer) {
        navContainer.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'A' && navContainer.classList.contains('is-open')) {
                navContainer.classList.remove('is-open');
                if (menuToggle) menuToggle.classList.remove('is-open');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // -------------------------
    // ONBOARDING WIZARD
    // -------------------------
    const onboardingForm = document.getElementById('onboarding-form');
    const stepSections = Array.from(document.querySelectorAll('.onboarding-step'));
    const stepTabs = Array.from(document.querySelectorAll('.onboarding-step-tab'));
    const progressBar = document.querySelector('.onboarding-progress-bar');
    const stepLabel = document.querySelector('.onboarding-progress-current');
    const stepTotalLabel = document.querySelector('.onboarding-progress-total');

    if (!onboardingForm || stepSections.length === 0) {
        // No onboarding on this page – nothing else to do.
        return;
    }

    let currentStepIndex = 0;
    const totalSteps = stepSections.length;

    if (stepTotalLabel) {
        stepTotalLabel.textContent = totalSteps.toString();
    }

    function clampStep(index) {
        if (index < 0) return 0;
        if (index >= totalSteps) return totalSteps - 1;
        return index;
    }

    function updateProgressUI(index) {
        const humanStep = index + 1;
        if (stepLabel) stepLabel.textContent = humanStep.toString();

        const percent = (humanStep / totalSteps) * 100;
        if (progressBar) {
            progressBar.style.width = `${percent}%`;
        }

        // Tabs
        stepTabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('active');
                tab.setAttribute('aria-current', 'step');
            } else {
                tab.classList.remove('active');
                tab.removeAttribute('aria-current');
            }
        });
    }

    function showStep(index) {
        currentStepIndex = clampStep(index);

        stepSections.forEach((section, i) => {
            if (i === currentStepIndex) {
                section.classList.add('active');
                section.removeAttribute('hidden');
            } else {
                section.classList.remove('active');
                section.setAttribute('hidden', 'hidden');
            }
        });

        updateProgressUI(currentStepIndex);
        updateSummaryPreview(); // safe even if we’re not on last step
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  // Initial step
    showStep(0);

    // NEXT / BACK BUTTONS
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');

    nextButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStepIndex < totalSteps - 1) {
                showStep(currentStepIndex + 1);
            }
        });
    });

    prevButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStepIndex > 0) {
                showStep(currentStepIndex - 1);
            }
        });
    });

    // CLICKING ON TABS
    stepTabs.forEach((tab, idx) => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            showStep(idx);
        });
    });

    // -------------------------
    // SUMMARY PREVIEW HELPERS
    // -------------------------

    function getInputValue(id) {
        const el = document.getElementById(id);
        if (!el) return '';
        if (el.type === 'checkbox') {
            return el.checked ? 'Yes' : 'No';
        }
        if (el.type === 'range') {
            return el.value;
        }
        return el.value || '';
    }

    function getSelectedText(id) {
        const el = document.getElementById(id);
        if (!el || !el.options) return '';
        const opt = el.options[el.selectedIndex];
        return opt ? opt.textContent.trim() : '';
    }

    function getCheckedLabels(name) {
        const nodes = document.querySelectorAll(`input[name="${name}"]:checked`);
        if (!nodes.length) return '';
        const labels = [];
        nodes.forEach((n) => {
            const label = n.closest('label');
            if (label) labels.push(label.textContent.trim());
        });
        return labels.join(', ');
                      }
  function updateSummaryPreview() {
        // All of these “if (el)” checks keep things safe even if an ID is missing.
        const name = getInputValue('display_name') || getInputValue('name');
        const goal = getSelectedText('main_goal') || getInputValue('main_goal_other');
        const start = getInputValue('plan_start');
        const end = getInputValue('plan_end');
        const calories = getInputValue('daily_calories');
        const budget = getInputValue('weekly_budget');

        const nutrition = getCheckedLabels('nutrition_focus[]') ||
                          getSelectedText('nutrition_primary');

        const allergies = getCheckedLabels('allergies[]');
        const neverInclude = getInputValue('never_include');

        const pantryPriority = getInputValue('pantry_aggressiveness');
        const stores = getCheckedLabels('stores[]');
        const brandPref = getSelectedText('brand_preference');

        const activity = getSelectedText('activity_level');
        const movementDays = getInputValue('movement_days');
        const movementMinutes = getInputValue('movement_minutes');

        function setSummary(field, value) {
            const span = document.querySelector(`[data-summary="${field}"]`);
            if (span && value !== undefined) {
                span.textContent = value && value.trim() ? value : '—';
            }
        }

        setSummary('name', name);
        setSummary('main_goal', goal);
        setSummary('dates', start && end ? `${start} → ${end}` : '');
        setSummary('calories', calories ? `${calories} kcal/day` : '');
        setSummary('budget', budget ? `$${budget}/week` : '');
        setSummary('nutrition_focus', nutrition);
        setSummary('allergies', allergies);
        setSummary('never_include', neverInclude);
        setSummary('pantry_priority', pantryPriority ? `Level ${pantryPriority}` : '');
        setSummary('stores', stores);
        setSummary('brand_preference', brandPref);
        setSummary('activity_level', activity);
        setSummary('movement_days', movementDays ? `${movementDays} days/week` : '');
        setSummary('movement_minutes', movementMinutes ? `${movementMinutes} min/day` : '');
    }

    // Call once initially to fill any obvious fields
    updateSummaryPreview();

    // OPTIONAL: update summary when certain key fields change
    const summaryWatchSelectors = [
        '#display_name', '#name',
        '#main_goal', '#main_goal_other',
        '#plan_start', '#plan_end',
        '#daily_calories', '#weekly_budget',
        '#pantry_aggressiveness',
        '#brand_preference',
        '#activity_level',
        '#movement_days', '#movement_minutes'
    ];

    summaryWatchSelectors.forEach((sel) => {
        const el = document.querySelector(sel);
        if (el) {
            el.addEventListener('change', updateSummaryPreview);
            el.addEventListener('input', updateSummaryPreview);
        }
    });

    // SUBMIT HANDLER – prototype: go to dashboard
    onboardingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In production this would send data to backend.
        window.location.href = 'dashboard.html';
    });
});
