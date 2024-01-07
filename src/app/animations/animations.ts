import { animation, trigger, state, group, style, transition, animate, useAnimation, query, animateChild } from '@angular/animations';

export const fadeInAnimation = animation([
  style({
    opacity: '{{ opacity }}'
  }),
  animate('{{ time }}')
])

export const fadeIn = trigger('fadeIn', [
  transition('visible => invisible', [
    useAnimation(fadeInAnimation, {
      params: {
        opacity: 0,
        time: '5s',
      }
    })
  ])
])

export const slideInLeft = trigger('slideInLeft', [
  state('false', style({
    transform: 'translateX(-48rem)',
    opactiy: 0,
  })),
  state('true', style({
    transform: 'translateX(0)',
    opacity: 1
  })),
  transition('true <=> false', animate('400ms ease-in-out')),
])

export const slideInTop = trigger('slideInTop', [
  state('true', style({
    transform: 'translateY(-12rem)',
    opactiy: 0,
  })),
  state('false', style({
    transform: 'translateY(0)',
    opacity: 1
  })),
  transition('true <=> false', animate('400ms ease-in-out')),
])


export const openModal = trigger('openModal', [
  transition(
    ':enter', 
    [
      style({ height: 0, opacity: 0 }),
      animate('1s ease-out', 
              style({ height: 300, opacity: 1 }))
    ]
  ),
  transition(
    ':leave', 
    [
      style({ height: 300, opacity: 1 }),
      animate('1s ease-in', 
              style({ height: 0, opacity: 0 }))
    ]
  )
])

export const zoom = trigger('zoom', [
  state('true', style({
    transform: 'scale(1.08)',
    opactiy: 0,
  })),
  state('false', style({
    transform: 'scale(1)',
    opacity: 1
  })),
  transition('true <=> false', animate('400ms ease-in-out')),
])

export const zoomAbs = trigger('zoomAbs', [
  state('true', style({
    transform: 'translate(-50%, -50%) scale(1.2)',
    opactiy: 0,
  })),
  state('false', style({
    transform: 'translate(-50%, -50%) scale(1)',
    opacity: 1
  })),
  transition('true <=> false', animate('500ms ease-in')),
])

export const swapRight = trigger('swapRight', [
  transition('* => *', [
    style({opacity: 0}),
    animate(600)
  ]),
  transition('* <= *', [])
])

// ngIf animations

export const ngIfFadeIn = trigger('ngIfFadeIn', [
  transition(
    ':enter', 
    [
      style({ opacity: 0 }),
      animate('0.82s ease-out', 
              style({ opacity: 1 }))
    ]
  ),
  transition(
    ':leave', 
    [
      style({ opacity: 1 }),
      animate('0.82s ease-in', 
              style({ opacity: 0 }))
    ]
  )
])

export const ngIfFadeOut = trigger('ngIfFadeOut', [
  transition(
    ':enter', 
    [
      style({ opacity: 1 }),
      animate('0.82s ease-in', 
              style({ opacity: 0 }))
    ]
  ),
  transition(
    ':leave', 
    [
      style({ opacity: 0 }),
      animate('0.82s ease-out', 
              style({ opacity: 1 }))
    ]
  )
])


export const ngIfSlideInBottom = trigger('ngIfSlideInBottom', [
  transition(
    ':enter', 
    [
      style({ transform: 'translateY(200%)' }),
      animate('0.75s ease-in-out', 
              style({ transform: 'translateY(0)' }))
    ]
  ),
  transition(
    ':leave', 
    [
      style({ transform: 'translateY(0)' }),
      animate('0.75s ease-in-out', 
              style({ transform: 'translateY(200%)' }))
    ]
  )
])

export const ngIfSlideInBottomAbs = trigger('ngIfSlideInBottomAbs', [
  transition(
    ':enter', 
    [
      style({ transform: 'translate(-50%, 200%' }),
      animate('0.75s ease-in-out', 
              style({ transform: 'translate(-50%, 0%)' }))
    ]
  ),
  transition(
    ':leave', 
    [
      style({ transform: 'translate(-50%, 0%)' }),
      animate('0.75s ease-in-out', 
              style({ transform: 'translate(-50%, 200%)' }))
    ]
  )
])

export const ngIfSlideInTop = trigger('ngIfSlideInTop', [
  transition(
    ':enter', 
    [
      style({ transform: 'translateY(-200%)' }),
      animate('0.75s ease-in-out', 
              style({ transform: 'translateY(0)' }))
    ]
  ),
  transition(
    ':leave', 
    [
      style({ transform: 'translateY(0)' }),
      animate('0.75s ease-in-out', 
              style({ transform: 'translateY(-200%)' }))
    ]
  )
])

// Router animation
export const routeFadeIn = trigger('routeFadeIn', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0, position: 'absolute' })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        style({ opacity: 1, position: 'absolute' }),
        animate('0.4s', style({ opacity: 0 })),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('0.4s', style({ opacity: 1, position: 'absolute' })),
      ],
      { optional: true }
    ),
  ])
])

export const routeSlideInLeft = trigger('routeSlideInLeft', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: '-100%' })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%' }))
      ], { optional: true }),
      query('@*', animateChild(), { optional: true })
    ]),
  ])
])
