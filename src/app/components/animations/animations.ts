import { animation, trigger, state, style, transition, animate, useAnimation } from '@angular/animations';

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