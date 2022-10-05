import { ProfilesService, UserService } from '../../core';
import { of } from 'rxjs';
import { FollowButtonComponent } from './follow-button.component';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

describe('FavoriteButton', () => {
  const userProfile = {
    username: 'Sample',
    bio: '',
    image: '',
    following: null,
  };

  it('should allow to follow', () => {
    cy.mount(FollowButtonComponent, {
      componentProperties: {
        profile: { ...userProfile, following: false },
        toggle: {
          emit: cy.spy().as('toggleSpy'),
        } as any,
      },
      providers: [
        {
          provide: ProfilesService,
          useValue: {
            follow: username => of({ ...userProfile, following: true }).pipe(delay(100)),
            unfollow: username => of({ ...userProfile, following: false }),
          },
        },
        {
          provide: UserService,
          useValue: {
            isAuthenticated: of(true),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
      ],
      declarations: [FollowButtonComponent],
    });

    cy.get('button').should('contain', 'Follow');
    cy.get('button').should('not.have.class', 'disabled');
    cy.get('button').click();
    cy.get('button').should('have.class', 'disabled');
    cy.get('button').should('not.have.class', 'disabled');
    cy.get('button').should('contain', 'Unfollow');
    cy.get('@toggleSpy').should('have.been.calledOnceWith', true);
  });
});
