/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express';

import UserRole from '../../enums/UserRoleEnum';
import UnauthorizedError from '../errorHandling/errors/UnauthorizedError';

type ApplicationPolicies = 'allowedRolesToCreateUsers';

type AuthorizeOptions = {
    checkApplicationPolicies?: ApplicationPolicies[];
};

const DEFAULT_AUTHORIZATION_OPTIONS: AuthorizeOptions = {
    checkApplicationPolicies: [],
};

const authorize =
    (roles: UserRole[] | UserRole, options = DEFAULT_AUTHORIZATION_OPTIONS) =>
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { user_id } = request.params;
            const { id, role } = request.user;
            const { allowedRolesToCreateUsers } = request.application;

            let routeRoles: string[];

            if (typeof roles === 'string') {
                routeRoles = [roles];
            } else {
                routeRoles = roles;
            }

            if (
                options.checkApplicationPolicies &&
                options.checkApplicationPolicies.includes(
                    'allowedRolesToCreateUsers'
                )
            ) {
                routeRoles = [...routeRoles, ...allowedRolesToCreateUsers];
            }

            if (routeRoles.includes(UserRole.GUEST)) {
                return next();
            }

            if (routeRoles.includes(UserRole.USER) && user_id === id) {
                return next();
            }
            if (
                routeRoles.includes(UserRole.APP_ADMIN) &&
                role === UserRole.APP_ADMIN
            ) {
                return next();
            }
            if (
                routeRoles.includes(UserRole.SERVICE_ADMIN) &&
                role === UserRole.SERVICE_ADMIN
            ) {
                return next();
            }

            throw new UnauthorizedError('Unauthorized');
        } catch (error) {
            return next(error);
        }
    };

export default authorize;
