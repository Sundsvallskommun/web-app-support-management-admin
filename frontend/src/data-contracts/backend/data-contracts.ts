/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  name: string;
  username: string;
  givenName: string;
  surname: string;
}

export interface UserApiResponse {
  data: User;
  message: string;
}

export interface Municipality {
  municipalityId: string;
  name: string;
}

export interface MunicipalitiesApiResponse {
  data: Municipality[];
  message: string;
}

export interface Namespace {
  namespace: string;
  displayname: string;
  description: string;
  shortCode: string;
  created: string;
  modified?: string;
}
 
export interface NamespacesApiResponse {
  data: Namespace[];
  message: string;
}

export interface NamespaceApiResponse {
  data: Namespace;
  message: string;
}

export interface NamespaceCreateRequest {
  namespace: string;
  displayname: string;
  description: string;
  shortCode: string;
}

export interface NamespaceUpdateRequest {
  displayname: string;
  description: string;
}

export interface Role {
  name: string;
  created: string;
  modified?: string;
}

export interface RolesApiResponse {
  data: Role[];
  message: string;
}

export interface RoleApiResponse {
  data: Role;
  message: string;
}

export interface RoleCreateRequest {
  name: string;
}

export interface CategoryType {
  name: string;
  displayName: string;
  escalationEmail: string;
  created: string;
  modified?: string;
}

export interface Category {
  name: string;
  displayName: string;
  created: string;
  modified?: string;
  types?: CategoryType[];
}

export interface CategoriesApiResponse {
  data: Category[];
  message: string;
}

export interface CategoryApiResponse {
  data: Category;
  message: string;
}

export interface CategoryCreateRequest {
  name: string;
}
