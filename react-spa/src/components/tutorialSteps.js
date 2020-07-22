export const tutorialSteps = [
    {
        id: 'intro',
        attachTo: '.first-element bottom',
        beforeShowPromise: function () {
        return new Promise(function (resolve) {
            setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
            }, 500);
        });
        },
        buttons: [
        {
            classes: 'shepherd-button-secondary',
            text: 'Back',
            type: 'back'
        },
        {
            classes: 'shepherd-button-primary',
            text: 'Next',
            type: 'next'
        }
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        highlightClass: 'highlight',
        scrollTo: false,
        cancelIcon: {
        enabled: true,
        },
        text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],
        when: {
        show: () => {
            console.log('show step');
        },
        hide: () => {
            console.log('hide step');
        }
        }
    },
]
