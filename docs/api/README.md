# Buildatics Platform API — Reference

Auto-generated from the live Swagger spec. Do not hand-edit; rerun the generator if the spec changes.

- **Title:** Platform API
- **Version:** v1
- **Base URL (dev):** `https://bap-dev-mon-cap-api.orangeflower-bf81320d.australiaeast.azurecontainerapps.io`
- **Swagger UI:** `https://bap-dev-mon-cap-api.orangeflower-bf81320d.australiaeast.azurecontainerapps.io/swagger/index.html`
- **OpenAPI spec:** `https://bap-dev-mon-cap-api.orangeflower-bf81320d.australiaeast.azurecontainerapps.io/swagger/v1/swagger.json` (also saved at [`openapi.json`](openapi.json))
- **Endpoints:** 305 paths · 305 operations
- **Schemas (DTOs):** 214 — see [`schemas.md`](schemas.md)

## Authentication

OAuth2 Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Obtain a token via the [`Token`](endpoints/token.md) endpoints (client credentials) or the [`Account`](endpoints/account.md) flows (user sign-in / password reset / email confirmation).

## Conventions

- Most resources expose a parallel `*A` (admin) tag — same domain, admin-scoped endpoints (e.g. `Companies` vs `CompaniesA`).
- Standard CRUD shape per resource: `/Create`, `/Get`, `/Update`, `/Delete` (hard), `/SoftDelete`, `/Page` (paged list), `/All` (full list).
- Paged list endpoints accept [`PagedReq`](schemas.md#pagedreq) and return `{Resource}ResPage`.
- `POST` is used for most reads that take a body (paged queries, filters), not just writes.
- All operations require `oauth2` unless marked otherwise (e.g. `/api/Account/ForgotPassword`).

## Tenant-scoped endpoints

| Tag | # ops | Description |
| --- | ---: | --- |
| [Account](endpoints/account.md) | 5 | Provides API for registering new users and other account management related functions. |
| [AuditLogs](endpoints/auditlogs.md) | 1 | Provides APIs for retrieving audit logs that track all changes made within the company. Audit logs record user actions including create, … |
| [BlobMapLabels](endpoints/blobmaplabels.md) | 6 | Manages Document/Blob labels that can be assigned to BlobMaps for categorisation and filtering. |
| [BlobMaps](endpoints/blobmaps.md) | 7 | Manages Documents/BlobMaps — metadata records that associate uploaded blobs/documents with owner entities and labels. |
| [Brochures](endpoints/brochures.md) | 6 | Manages tenant brochures stored as HTML blobs via BlobMap/BlobModel. |
| [BrochureTemplates](endpoints/brochuretemplates.md) | 1 | Provides read-only brochure template endpoints for users with brochure read permissions. Returns only templates that are marked as availa… |
| [Company](endpoints/company.md) | 5 | Provides company-scoped APIs for viewing and maintaining the current tenant's company profile and branding data. These endpoints expose t… |
| [CompanyClickUpTasks](endpoints/companyclickuptasks.md) | 2 | Integrates Clickup task management with the Buildatics platform. Allows querying and synchronizing Clickup tasks associated with a compan… |
| [CompanyDesignBlobs](endpoints/companydesignblobs.md) | 5 | Manages blob (file/image) attachments for company designs. Blobs store images and files that are referenced by design objects and contrib… |
| [CompanyDesignCustomFields](endpoints/companydesigncustomfields.md) | 5 | Manages custom fields for company designs, allowing companies to extend design metadata with application-specific attributes. Custom fiel… |
| [CompanyDesignFacadeMaps](endpoints/companydesignfacademaps.md) | 4 | Manages the relationships between company designs and facade elements used within those designs. Allows designs to include multiple facad… |
| [CompanyDesigns](endpoints/companydesigns.md) | 11 | Manages company-specific design library items. Companies can create, customize, and organize designs from the system library. Supports ve… |
| [CompanyFacadeBlobMaps](endpoints/companyfacadeblobmaps.md) | 5 | Manages blob (file) attachments for company facades. Handles the association between facade design elements and their related images/files. |
| [CompanyFacades](endpoints/companyfacades.md) | 6 | Manages company facade library items used in building design visualization. Facades are reusable architectural design elements that can b… |
| [Contacts](endpoints/contacts.md) | 5 | Manages company contacts and their associated address information. Contacts can be referenced from various entities (leads, projects, sta… |
| [ContactToContactTypeMaps](endpoints/contacttocontacttypemaps.md) | 4 | Manages the mapping between contacts and contact types within a company. Associates contacts with one or more classifications for organiz… |
| [ContactTypes](endpoints/contacttypes.md) | 5 | Manages contact type classifications used to categorize contacts within a company (e.g., Owner, Agent, Contractor). Contact types help or… |
| [Designations](endpoints/designations.md) | 5 | Allows to manage Designations that Staff within a Company can have e.g. Supervisor, Tradie, Project Manager etc |
| [DesignationToModuleAppRoleMap](endpoints/designationtomoduleapprolemap.md) | 4 | Allows to manage the permissions for Designations by mapping them to ModuleAppRoles. |
| [Designs](endpoints/designs.md) | 1 | Provides read-only access to system-provided design templates that users can view and import into their company libraries. Design templat… |
| [HtmlPageTemplates](endpoints/htmlpagetemplates.md) | 3 | Manages company-accessible HTML page templates used to render branded documents and hosted HTML content. Templates can be downloaded with… |
| [HttpIntegrations](endpoints/httpintegrations.md) | 1 | Generaic Http query execution controller for all integrated services |
| [LeadActivityLogs](endpoints/leadactivitylogs.md) | 2 | Manages the activity timeline for a sales lead, including manual notes and system-generated events. Activity logs provide the engagement … |
| [LeadBlobMaps](endpoints/leadblobmaps.md) | 5 | Manages file and image attachments associated with sales leads. These endpoints support storing proposal documents, reference files, and … |
| [LeadDesigns](endpoints/leaddesigns.md) | 3 | Manages the company designs linked to a sales lead during preconstruction and quoting workflows. These links let sales users track which … |
| [LeadQuoteLineItems](endpoints/leadquotelineitems.md) | 4 | Manages the individual line items that make up a lead quote in the sales module. Line items capture the itemized pricing, quantities, and… |
| [LeadQuotes](endpoints/leadquotes.md) | 7 | Manages quotations generated for Sales leads, supporting multi-quote tracking and quote-to-order workflows. Enables sales teams to genera… |
| [Leads](endpoints/leads.md) | 8 | Manages Sales leads—prospects or clients being tracked through the sales pipeline—with full CRUD and pagination support. Supports lead pr… |
| [LeadStages](endpoints/leadstages.md) | 6 | Manages the company-owned sales pipeline stages that define how leads progress through the sales process. These stages act as reusable wo… |
| [LeadTasks](endpoints/leadtasks.md) | 6 | Associates tasks with individual Sales leads for activity planning and follow-up management within the sales process. Enables sales teams… |
| [ModuleAppRoles](endpoints/moduleapproles.md) | 2 | Retrieves the module permission roles that a company can assign to staff designations. These roles define feature-level access such as re… |
| [PublicCompanyDesigns](endpoints/publiccompanydesigns.md) | 3 | Allows anonymous access to company's deisgns. |
| [QuoteTemplates](endpoints/quotetemplates.md) | 5 | Manages reusable company-owned quote templates for the sales module. These templates let the UI store structured defaults and apply them … |
| [Staff](endpoints/staff.md) | 10 | Manages staff user accounts, roles, and designations within a company. Staff users have assigned designations that grant them module-spec… |
| [StaticValues](endpoints/staticvalues.md) | 5 | Provides APIs for get all Enums. |
| [Subscription](endpoints/subscription.md) | 4 | Provides APIs to manage company subscription. These can be accessed even if company is locked. |
| [SubscriptionPaymentHistory](endpoints/subscriptionpaymenthistory.md) | 1 | Provides paginated access to subscription payment history for the current company. |
| [Token](endpoints/token.md) | 5 | — |
| [UserProfile](endpoints/userprofile.md) | 3 | Provides authenticated-user APIs for reading and updating the current user's profile, roles, and API key settings. These endpoints manage… |

## Admin-scoped endpoints (`*A` suffix)

| Tag | # ops | Description |
| --- | ---: | --- |
| [BrochureTemplatesA](endpoints/brochuretemplatesa.md) | 5 | Provides admin-only CRUD endpoints for brochure templates. Brochure templates are uploaded files (e.g. PDFs, images) that admins manage f… |
| [ClickupA](endpoints/clickupa.md) | 2 | Provides admin-only proxy endpoints for querying ClickUp data from the Buildatics API. These endpoints help validate ClickUp connectivity… |
| [ClientsA](endpoints/clientsa.md) | 9 | Provides API for managing the Clients for the users with Admin role.  Supports both Bearer Token and ApiKey Authorization |
| [CompaniesA](endpoints/companiesa.md) | 13 | Provides API for managing the companies for the users with Admin role. |
| [CompanyClickUpTasksA](endpoints/companyclickuptasksa.md) | 6 | Manages company-scoped ClickUp task records across all tenants from an admin perspective. These endpoints support inspection, paging, and… |
| [ContactTypesA](endpoints/contacttypesa.md) | 5 | Provides system-wide admin APIs for managing contact type classifications across all companies. Admin users can create, update, and delet… |
| [DesignBlobsA](endpoints/designblobsa.md) | 5 | — |
| [DesignCustomFieldsA](endpoints/designcustomfieldsa.md) | 5 | Provides admin APIs for managing custom fields at the system design template level. Admin users can extend design metadata with applicati… |
| [DesignFacadeMapsA](endpoints/designfacademapsa.md) | 4 | — |
| [DesignsA](endpoints/designsa.md) | 9 | Provides admin APIs for managing system-wide design templates. Admin and design admins can create, update, and manage design templates th… |
| [DummyDataA](endpoints/dummydataa.md) | 3 | Provides API for managing the DummyData for the users with Admin role. |
| [EmailTemplatesA](endpoints/emailtemplatesa.md) | 5 | Provides admin APIs for managing email templates used across the system. Admin users can define and customize email templates for system … |
| [FacadeBlobMapsA](endpoints/facadeblobmapsa.md) | 5 | — |
| [FacadesA](endpoints/facadesa.md) | 6 | — |
| [GoogleSheetsA](endpoints/googlesheetsa.md) | 2 | Provides admin-only Google Sheets and Google Drive integration endpoints for downloading files and reading sheet data. These endpoints su… |
| [HtmlPageTemplatesA](endpoints/htmlpagetemplatesa.md) | 5 | Provides admin-only CRUD endpoints for system and tenant HTML page templates. These templates are used to render hosted HTML documents, b… |
| [HtmlToPdfA](endpoints/htmltopdfa.md) | 2 | — |
| [HttpQueriesA](endpoints/httpqueriesa.md) | 8 | Provides admin-only management of saved HTTP query definitions used for external integrations. Queries can be created, updated, copied be… |
| [ModuleAppRoleA](endpoints/moduleapprolea.md) | 6 | Allows Admin to manage the ModuleAppRole entities, which represent the permissions for different modules in the application. Companies ca… |
| [StripeSessionsA](endpoints/stripesessionsa.md) | 6 | Used for house keeping |
| [SubscriptionPaymentsA](endpoints/subscriptionpaymentsa.md) | 3 | — |
| [SubscriptionPlansA](endpoints/subscriptionplansa.md) | 5 | Provides admin-only CRUD endpoints for subscription plan definitions. Subscription plans control the pricing and feature tiers available … |
| [UsersA](endpoints/usersa.md) | 10 | Provides API for managing the user accounts for the users with Admin role. |
