# Schemas (DTOs)

214 schemas referenced by the API. [← back to index](README.md)

## Index

[AddressReq](#addressreq) · [AddressRes](#addressres) · [AllEnumsRes](#allenumsres) · [AppModuleRoleWrapper](#appmodulerolewrapper) · [AppRoleRes](#approleres) · [AuditLogRes](#auditlogres) · [AuditLogResPage](#auditlogrespage) · [BlobMapFilterReq](#blobmapfilterreq) · [BlobMapLabelCountRes](#blobmaplabelcountres) · [BlobMapLabelReq](#blobmaplabelreq) · [BlobMapLabelRes](#blobmaplabelres) · [BlobMapOwnerEntityType](#blobmapownerentitytype) · [BlobMapRes](#blobmapres) · [BlobMapResPage](#blobmaprespage) · [BlobMapStatus](#blobmapstatus) · [BlobMapToLabelMapRes](#blobmaptolabelmapres) · [BlobMapUpdateReq](#blobmapupdatereq) · [BlobModelRes](#blobmodelres) · [BlobModelUpdateReq](#blobmodelupdatereq) · [BrochureRes](#brochureres) · [BrochureResPage](#brochurerespage) · [BrochureTemplateARes](#brochuretemplateares) · [BrochureTemplateAResPage](#brochuretemplatearespage) · [BrochureTemplateRes](#brochuretemplateres) · [BrochureTemplateResPage](#brochuretemplaterespage) · [ChangeEmailReq](#changeemailreq) · [ChangePasswordReq](#changepasswordreq) · [ClientCredentialReq](#clientcredentialreq) · [ClientCredentialTokenRes](#clientcredentialtokenres) · [ClientReqA](#clientreqa) · [ClientResA](#clientresa) · [ClientResAPage](#clientresapage) · [ClientType](#clienttype) · [CompanyARes](#companyares) · [CompanyClickUpTaskAReq](#companyclickuptaskareq) · [CompanyClickUpTaskPagedReq](#companyclickuptaskpagedreq) · [CompanyClickUpTaskRes](#companyclickuptaskres) · [CompanyClickUpTaskResPage](#companyclickuptaskrespage) · [CompanyDesignCustomFieldReq](#companydesigncustomfieldreq) · [CompanyDesignCustomFieldRes](#companydesigncustomfieldres) · [CompanyDesignFacadeMapReq](#companydesignfacademapreq) · [CompanyDesignFacadeMapRes](#companydesignfacademapres) · [CompanyDesignReq](#companydesignreq) · [CompanyDesignRes](#companydesignres) · [CompanyDesignResPage](#companydesignrespage) · [CompanyDesignStatus](#companydesignstatus) · [CompanyDesignsIFrameRes](#companydesignsiframeres) · [CompanyFacadeBlobMapRes](#companyfacadeblobmapres) · [CompanyFacadeReq](#companyfacadereq) · [CompanyFacadeRes](#companyfacaderes) · [CompanyFacadeResPage](#companyfacaderespage) · [CompanyMinARes](#companyminares) · [CompanyMinAResPage](#companyminarespage) · [CompanyRes](#companyres) · [ConfirmEmailReq](#confirmemailreq) · [ContactMinRes](#contactminres) · [ContactReq](#contactreq) · [ContactRes](#contactres) · [ContactResPage](#contactrespage) · [ContactToContactTypeMapReq](#contacttocontacttypemapreq) · [ContactToContactTypeMapRes](#contacttocontacttypemapres) · [ContactToContactTypeMapResPage](#contacttocontacttypemaprespage) · [ContactTypeReq](#contacttypereq) · [ContactTypeRes](#contacttyperes) · [DateOnly](#dateonly) · [DateTimeInterval](#datetimeinterval) · [DayOfWeek](#dayofweek) · [DesignAReq](#designareq) · [DesignBlobMapARes](#designblobmapares) · [DesignBlobMapAResPage](#designblobmaparespage) · [DesignBlobType](#designblobtype) · [DesignCustomFieldAReq](#designcustomfieldareq) · [DesignCustomFieldARes](#designcustomfieldares) · [DesignFacadeMapReq](#designfacademapreq) · [DesignFacadeMapRes](#designfacademapres) · [DesignFacadeMapResPage](#designfacademaprespage) · [DesignRes](#designres) · [DesignResPage](#designrespage) · [DesignStatus](#designstatus) · [DesignationReq](#designationreq) · [DesignationRes](#designationres) · [DesignationResPage](#designationrespage) · [DesignationToAppUserMapRes](#designationtoappusermapres) · [DesignationToModuleAppRoleMapReq](#designationtomoduleapprolemapreq) · [DesignationToModuleAppRoleMapRes](#designationtomoduleapprolemapres) · [DrivewayType](#drivewaytype) · [EmailTemplateAReq](#emailtemplateareq) · [EmailTemplateARes](#emailtemplateares) · [EmailTemplateAResPage](#emailtemplatearespage) · [EmailType](#emailtype) · [EnumRes](#enumres) · [ErrorDto](#errordto) · [ErrorType](#errortype) · [ExternalApiProviderType](#externalapiprovidertype) · [FacadeBlobMapRes](#facadeblobmapres) · [FacadeBlobMapResPage](#facadeblobmaprespage) · [FacadeBlobType](#facadeblobtype) · [FacadeReq](#facadereq) · [FacadeRes](#facaderes) · [FacadeResPage](#facaderespage) · [ForgotPasswordReq](#forgotpasswordreq) · [ForgotPasswordRes](#forgotpasswordres) · [GenderType](#gendertype) · [HtmlPageTemplateAReq](#htmlpagetemplateareq) · [HtmlPageTemplateARes](#htmlpagetemplateares) · [HtmlPageTemplateAResPage](#htmlpagetemplatearespage) · [HtmlPageTemplatePageRes](#htmlpagetemplatepageres) · [HtmlPageTemplatePageResPage](#htmlpagetemplatepagerespage) · [HtmlStringToPdfReq](#htmlstringtopdfreq) · [HttpExecuteQueryReq](#httpexecutequeryreq) · [HttpQueryAppRoleMapRes](#httpqueryapprolemapres) · [HttpQueryReq](#httpqueryreq) · [HttpQueryRes](#httpqueryres) · [HttpQueryResPage](#httpqueryrespage) · [HttpVerb](#httpverb) · [InviteStaffRes](#invitestaffres) · [JsonNode](#jsonnode) · [JsonNodeOptions](#jsonnodeoptions) · [LandType](#landtype) · [LeadActivityLogPageReq](#leadactivitylogpagereq) · [LeadActivityLogReq](#leadactivitylogreq) · [LeadActivityLogRes](#leadactivitylogres) · [LeadActivityLogResPage](#leadactivitylogrespage) · [LeadActivityLogType](#leadactivitylogtype) · [LeadActivitySourceType](#leadactivitysourcetype) · [LeadBlobMapRes](#leadblobmapres) · [LeadBlobType](#leadblobtype) · [LeadContactRes](#leadcontactres) · [LeadDesignReq](#leaddesignreq) · [LeadDesignRes](#leaddesignres) · [LeadPriority](#leadpriority) · [LeadQuoteLineItemReq](#leadquotelineitemreq) · [LeadQuoteLineItemRes](#leadquotelineitemres) · [LeadQuotePageReq](#leadquotepagereq) · [LeadQuoteReq](#leadquotereq) · [LeadQuoteRes](#leadquoteres) · [LeadQuoteResPage](#leadquoterespage) · [LeadQuoteStatus](#leadquotestatus) · [LeadQuoteStatusReq](#leadquotestatusreq) · [LeadQuoteVariantRes](#leadquotevariantres) · [LeadReq](#leadreq) · [LeadRes](#leadres) · [LeadResPage](#leadrespage) · [LeadStageReorderReq](#leadstagereorderreq) · [LeadStageReq](#leadstagereq) · [LeadStageRes](#leadstageres) · [LeadStatus](#leadstatus) · [LeadStatusReq](#leadstatusreq) · [LeadTaskReq](#leadtaskreq) · [LeadTaskRes](#leadtaskres) · [LeadTaskResPage](#leadtaskrespage) · [LeadTaskStatus](#leadtaskstatus) · [LeadTaskStatusReq](#leadtaskstatusreq) · [LeadUpdateStageReq](#leadupdatestagereq) · [LockCompanyAReq](#lockcompanyareq) · [LoginExternalReq](#loginexternalreq) · [MessageResponseDto](#messageresponsedto) · [ModuleAppRoleReq](#moduleapprolereq) · [ModuleAppRoleRes](#moduleapproleres) · [ModuleAppRoleResPage](#moduleapprolerespage) · [PagedReq](#pagedreq) · [PaymentStatus](#paymentstatus) · [PdfServiceType](#pdfservicetype) · [ProcessMessageItem](#processmessageitem) · [ProcessMessageRes](#processmessageres) · [PublicBlobModelRes](#publicblobmodelres) · [PublicCompanyDesignBlobMapRes](#publiccompanydesignblobmapres) · [PublicCompanyDesignCustomFieldRes](#publiccompanydesigncustomfieldres) · [PublicCompanyDesignFacadeMapRes](#publiccompanydesignfacademapres) · [PublicCompanyDesignRes](#publiccompanydesignres) · [PublicCompanyDesignResPage](#publiccompanydesignrespage) · [PublicCompanyFacadeBlobMapRes](#publiccompanyfacadeblobmapres) · [PublicCompanyFacadeRes](#publiccompanyfacaderes) · [QuoteTemplateReq](#quotetemplatereq) · [QuoteTemplateRes](#quotetemplateres) · [ReadResponse](#readresponse) · [RegisterCompanyAReq](#registercompanyareq) · [RegisterCompanyOwnerUserReq](#registercompanyowneruserreq) · [RegisterUserReq](#registeruserreq) · [ResetPasswordReq](#resetpasswordreq) · [ResourceOwnerRefreshTokenReq](#resourceownerrefreshtokenreq) · [ResourceOwnerTokenReq](#resourceownertokenreq) · [ResourceOwnerTokenRes](#resourceownertokenres) · [ResourceOwnerTokenUserRes](#resourceownertokenuserres) · [SalesLeadTaskPageReq](#salesleadtaskpagereq) · [SendConfirmEmailTokenReq](#sendconfirmemailtokenreq) · [StaffReq](#staffreq) · [StaffRes](#staffres) · [State](#state) · [StripeSessionRes](#stripesessionres) · [StripeSessionResPage](#stripesessionrespage) · [SubscriptionPaymentHistoryRes](#subscriptionpaymenthistoryres) · [SubscriptionPaymentHistoryResPage](#subscriptionpaymenthistoryrespage) · [SubscriptionPlanAReq](#subscriptionplanareq) · [SubscriptionPlanARes](#subscriptionplanares) · [SubscriptionPlanAResPage](#subscriptionplanarespage) · [SubscriptionPlanRes](#subscriptionplanres) · [TimeSpan](#timespan) · [TimeZoneInfo](#timezoneinfo) · [TokenCompanyRes](#tokencompanyres) · [UiThemeUserProfileReq](#uithemeuserprofilereq) · [UpdateBrochureTemplateAReq](#updatebrochuretemplateareq) · [UpdateCompanyAReq](#updatecompanyareq) · [UpdateCompanyFacadeBlobMapReq](#updatecompanyfacadeblobmapreq) · [UpdateDesignBlobMapAReq](#updatedesignblobmapareq) · [UpdateStripeSessionAReq](#updatestripesessionareq) · [UpdateUserEmailOtp2FAReq](#updateuseremailotp2fareq) · [UserDetailedRes](#userdetailedres) · [UserDetailedResPage](#userdetailedrespage) · [UserMinRes](#userminres) · [UserProfileReq](#userprofilereq) · [UserProfileRes](#userprofileres) · [UserRes](#userres) · [ValidateSubscriptionPlanRes](#validatesubscriptionplanres)

## AddressReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `street` | string | — | Free text |
| `areaCode` | string | yes | Or Pincode |
| `suburb` | string | — | Or District |
| `city` | string | — | Or Town |
| `state` | [`State`](#state) | — |  |

## AddressRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `street` | string | — | Free text |
| `areaCode` | string | yes | Or Pincode |
| `suburb` | string | — | Or District |
| `city` | string | — | Or Town |
| `state` | [`State`](#state) | — |  |

## AllEnumsRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `clientRoles` | string[] | — |  |
| `staffRoles` | string[] | — | Roles that a staff of a Company can have. E.g. Owner etc |
| `designBlobTypes` | [`EnumRes`](#enumres)[] | — |  |
| `designStatuses` | [`EnumRes`](#enumres)[] | — |  |
| `drivewayTypes` | [`EnumRes`](#enumres)[] | — |  |
| `emailTypes` | [`EnumRes`](#enumres)[] | — |  |
| `errorTypes` | [`EnumRes`](#enumres)[] | — |  |
| `facadeBlobTypes` | [`EnumRes`](#enumres)[] | — |  |
| `genderTypes` | [`EnumRes`](#enumres)[] | — |  |
| `leadActivityLogTypes` | [`EnumRes`](#enumres)[] | — |  |
| `leadActivitySourceTypes` | [`EnumRes`](#enumres)[] | — |  |
| `leadBlobTypes` | [`EnumRes`](#enumres)[] | — |  |
| `landTypes` | [`EnumRes`](#enumres)[] | — |  |
| `leadPriorities` | [`EnumRes`](#enumres)[] | — |  |
| `leadQuoteStatuses` | [`EnumRes`](#enumres)[] | — |  |
| `leadStatuses` | [`EnumRes`](#enumres)[] | — |  |
| `leadTaskStatuses` | [`EnumRes`](#enumres)[] | — |  |
| `moduleTypes` | [`EnumRes`](#enumres)[] | — |  |
| `modulePermissionTypes` | [`EnumRes`](#enumres)[] | — |  |
| `modulePermissionModifiers` | [`EnumRes`](#enumres)[] | — |  |
| `paymentStatuses` | [`EnumRes`](#enumres)[] | — |  |
| `states` | [`EnumRes`](#enumres)[] | — |  |

## AppModuleRoleWrapper

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `moduleType` | string | — |  |
| `modulePermissionType` | string | — |  |
| `modulePermissionModifier` | string | — |  |

## AppRoleRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `name` | string | — |  |

## AuditLogRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `url` | string | — |  |
| `httpVerb` | string | — |  |
| `httpStatusCode` | integer (int32) | — | Response HTTP status code |
| `userId` | string | — |  |
| `clientId` | string | — |  |
| `companyId` | string | — |  |
| `roles` | string[] | — |  |
| `requestOrTraceId` | string | — | Same as TraceIdentifier in HttpContext which is Error GUID APi returns on error. |
| `exceptionMessage` | string | — |  |
| `processingTimeInMilliseconds` | integer (int64) | — |  |
| `createdOnUtc` | string (date-time) | — |  |

## AuditLogResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`AuditLogRes`](#auditlogres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## BlobMapFilterReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `pageNumber` | integer (int32) | yes | The page number. |
| `pageSize` | integer (int32) | yes | The number of entities expected on a page. |
| `includeDeleted` | boolean | — |  |
| `labelIds` | string[] | — |  |
| `status` | [`BlobMapStatus`](#blobmapstatus) | — |  |
| `blobMapOwnerEntityType` | [`BlobMapOwnerEntityType`](#blobmapownerentitytype) | — |  |
| `blobOwnerEntityId` | string (uuid) | — |  |
| `blobMapOwnerEntitySubType` | integer (int32) | — |  |
| `virtualFolderPath` | string | — |  |
| `dateRange` | [`DateTimeInterval`](#datetimeinterval) | — |  |

## BlobMapLabelCountRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `companyId` | string (uuid) | — |  |
| `name` | string | — |  |
| `color` | string | — |  |
| `count` | string | — |  |

## BlobMapLabelReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes |  |
| `color` | string | — |  |

## BlobMapLabelRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `companyId` | string (uuid) | — |  |
| `name` | string | — |  |
| `color` | string | — |  |

## BlobMapOwnerEntityType

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`, `4`

## BlobMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `companyId` | string (uuid) | — |  |
| `blobModelId` | string (uuid) | — |  |
| `blobModel` | [`BlobModelRes`](#blobmodelres) | — |  |
| `virtualFolderPath` | string | — |  |
| `blobMapStatus` | [`BlobMapStatus`](#blobmapstatus) | — |  |
| `blobMapOwnerEntityType` | [`BlobMapOwnerEntityType`](#blobmapownerentitytype) | — |  |
| `blobOwnerEntityId` | string (uuid) | — |  |
| `blobMapOwnerEntitySubType` | integer (int32) | — |  |
| `blobMapToLabelMaps` | [`BlobMapToLabelMapRes`](#blobmaptolabelmapres)[] | — |  |
| `createdOnUtc` | string (date-time) | — |  |
| `updatedOnUtc` | string (date-time) | — |  |

## BlobMapResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`BlobMapRes`](#blobmapres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## BlobMapStatus

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`, `4`

## BlobMapToLabelMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `blobMapId` | string (uuid) | — |  |
| `blobMapLabelId` | string (uuid) | — |  |
| `blobMapLabel` | [`BlobMapLabelRes`](#blobmaplabelres) | — |  |

## BlobMapUpdateReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | yes |  |
| `virtualFolderPath` | string | — |  |
| `blobMapStatus` | [`BlobMapStatus`](#blobmapstatus) | — |  |
| `blobMapOwnerEntitySubType` | integer (int32) | — |  |
| `description` | string | — |  |

## BlobModelRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `fileName` | string | — | abc.png |
| `description` | string | — |  |
| `updatedOnUtc` | string (date-time) | — |  |
| `sasToken` | string | — | SAS token which can be used to download this blob |
| `sasUrl` | string | — | Url with SASToken which can be used to download this blob. |
| `inlineOpenSasToken` | string | — | SAS token which can be used to open this blob |
| `inlineOpenSasUrl` | string | — | Url opens in browser inline (for e.g. images, pdf etc.) |
| `expiresOnUtc` | string (date-time) | — |  |
| `previewSasToken` | string | — | SAS token which can be used to download this blob's preview |
| `previewSasUrl` | string | — | Url with SASToken which can be used to directly access this blob's preview. |
| `previewInlineOpenSasToken` | string | — | SAS token which can be used to open this blob's preview |
| `previewInlineOpenSasUrl` | string | — | Url opens in browser inline (for e.g. images, pdf etc.) |
| `previewExpiresOnUtc` | string (date-time) | — |  |

## BlobModelUpdateReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `fileName` | string | — | abc.png |
| `description` | string | — |  |

## BrochureRes

Response payload for a brochure with blob map details.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `name` | string | — |  |
| `note` | string | — | Optional short note shown to users for this brochure. |
| `jsonConfig` | string | — | Optional UI configuration JSON used by the client while rendering/editing. |
| `brochureTemplateId` | string (uuid) | — | Optional template used as the source when this brochure was created. |
| `blobMapId` | string (uuid) | — |  |
| `blobMap` | [`BlobMapRes`](#blobmapres) | — |  |

## BrochureResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`BrochureRes`](#brochureres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## BrochureTemplateARes

Admin response payload for brochure template details.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `name` | string | — |  |
| `note` | string | — | Optional short note shown to admins/users for this template. |
| `jsonConfig` | string | — | Optional UI configuration JSON used when creating brochures from this template. |
| `isAvailable` | boolean | — | Indicates whether the template is visible to non-admin brochure APIs. |
| `blobModelId` | string (uuid) | — |  |
| `blobModel` | [`BlobModelRes`](#blobmodelres) | — |  |

## BrochureTemplateAResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`BrochureTemplateARes`](#brochuretemplateares)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## BrochureTemplateRes

Response payload for available brochure templates.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `name` | string | — |  |
| `note` | string | — | Optional short note shown to admins/users for this template. |
| `jsonConfig` | string | — | Optional UI configuration JSON used when creating brochures from this template. |
| `blobModelId` | string (uuid) | — |  |
| `blobModel` | [`BlobModelRes`](#blobmodelres) | — |  |

## BrochureTemplateResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`BrochureTemplateRes`](#brochuretemplateres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## ChangeEmailReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `userId` | string (uuid) | — |  |
| `email` | string (email) | yes | New Email Id |

## ChangePasswordReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `oldPassword` | string (password) | yes |  |
| `newPassword` | string (password) | yes |  |

## ClientCredentialReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | string | yes | ClientId |
| `clientSecret` | string | yes | ClientSecret |

## ClientCredentialTokenRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `accessToken` | string | — |  |
| `tokenType` | string | — |  |
| `expiresIn` | integer (int64) | — |  |

## ClientReqA

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | The user friendly name for the client. e.g: console application, Angular JS app. |
| `clientType` | [`ClientType`](#clienttype) | — |  |
| `isActive` | boolean | — | Set this false to disable any requests for access tokens from the client. In short, disable the access for the client. |
| `expiresOnUtc` | string (date-time) | — |  |

## ClientResA

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | The user friendly name for the client. e.g: console application, Angular JS app. |
| `clientType` | [`ClientType`](#clienttype) | — |  |
| `isActive` | boolean | — | Set this false to disable any requests for access tokens from the client. In short, disable the access for the client. |
| `expiresOnUtc` | string (date-time) | — |  |
| `id` | string | — | Primary key. ClientId |
| `plainTextSecret` | string | — | ClientSecret. This will only be populated when  1. Client was created. 2. Secret was regenerated. |

## ClientResAPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`ClientResA`](#clientresa)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## ClientType

Types of Clients who can consume this API

**Type:** `integer` enum

Values: `0`, `1`, `2`

## CompanyARes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `name` | string | — |  |
| `abn` | string | — | Australian Business Number |
| `notificationEmail` | string | — | Email Id to which notifications such as Shift Start will be sent. In case this is not available, email the Owner's email id |
| `logoBlobUrl` | string | — | Public Url with readonly SAS of company Logo |
| `address` | [`AddressRes`](#addressres) | — |  |
| `isApproved` | boolean | — | Indicates whether this Company was approved by an Admin |
| `approvedOrRejectedByUser` | [`UserMinRes`](#userminres) | — |  |
| `approvedOrRejectedOnUtc` | string (date-time) | — |  |
| `isLocked` | boolean | — | When true, Users of this Company cannot generate Access Tokens |
| `lockedOnUtc` | string (date-time) | — |  |
| `reasonForLocking` | string | — |  |
| `lockedByUser` | [`UserMinRes`](#userminres) | — |  |
| `usageTotalBlobsSizeInBytes` | integer (int64) | — | The total size in bytes of all the blobs stored for this company. |
| `publicDataPermittedHostsCsv` | string | — | Comma separated list of permitted hosts from which public data can be accessed. e.g. "www.example.com,subdomain.example.com" These will be validated against the HTTP request Referrer header when fetching the blob. |
| `publicCompanyDesignStyle` | string | — | The value (could be string or json) for style attribute for the public company designs. |
| `clickUpCompanyId` | string | — | Id of the company in ClickUp When this is null it indicates that clickup integration is not enabled. |
| `currentSubscriptionPlanId` | string (uuid) | — | Current active subscription for this company |
| `currentSubscriptionPlanActivatedOnUtc` | string (date-time) | — |  |
| `currentSubscriptionPlanRenewsOnExpiry` | boolean | — | When true, it indicates that the current subscription plan is active and will be renewed on expiry date. When false, it indicates that the current subscription plan maybe active but will not be renewed once it expires. This indicates subscription was cancelled. |

## CompanyClickUpTaskAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `clickUpTaskId` | string | yes | Id of the Task in ClickUp |
| `clickUpListId` | string | yes | Id of the ClickUp List under which this Task belongs. |
| `taskJson` | [`JsonNode`](#jsonnode) | — |  |
| `primaryContactId` | string (uuid) | — | The User who is the primary contact for this Task (e.g. ITI Project's primary contact). When null, the Company Owner is the primary contact. |
| `parentCompanyClickUpTaskId` | string (uuid) | — | Id of the ClickUp parent Task under which this SubTask belongs, if any Not null indicates this is a SubTask. |

## CompanyClickUpTaskPagedReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `pageNumber` | integer (int32) | yes | The page number. |
| `pageSize` | integer (int32) | yes | The number of entities expected on a page. |
| `parentCompanyClickUpTaskId` | string (uuid) | — | Id of the ClickUp parent Task under which this SubTask belongs, if any Null will fetch all Tasks excluding SubTasks. Not null will fetch SubTasks of the specified parent Task. |

## CompanyClickUpTaskRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `companyId` | string (uuid) | — |  |
| `clickUpTaskId` | string | — | Id of the Task in ClickUp |
| `clickUpListId` | string | — | Id of the ClickUp List under which this Task belongs. |
| `taskJson` | [`JsonNode`](#jsonnode) | — |  |
| `primaryContact` | [`UserMinRes`](#userminres) | — |  |
| `parentCompanyClickUpTaskId` | string (uuid) | — | Id of the ClickUp parent Task under which this SubTask belongs, if any Not null indicates this is a SubTask. |
| `parentCompanyClickUpTask` | [`CompanyClickUpTaskRes`](#companyclickuptaskres) | — |  |

## CompanyClickUpTaskResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`CompanyClickUpTaskRes`](#companyclickuptaskres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## CompanyDesignCustomFieldReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `companyDesignId` | string (uuid) | — |  |
| `name` | string | yes |  |
| `value` | string | — |  |
| `group` | string | — | The name of the group this custom field belongs to. This is used in the UI to show related custom fields together. e.g. Room Dimensions |

## CompanyDesignCustomFieldRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `companyDesignId` | string (uuid) | — |  |
| `name` | string | — |  |
| `value` | string | — |  |
| `group` | string | — | The name of the group this custom field belongs to. This is used in the UI to show related custom fields together. e.g. Room Dimensions |

## CompanyDesignFacadeMapReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `companyDesignId` | string (uuid) | — |  |
| `companyFacadeId` | string (uuid) | — |  |

## CompanyDesignFacadeMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `companyDesignId` | string (uuid) | — |  |
| `companyFacadeId` | string (uuid) | — |  |
| `companyFacade` | [`CompanyFacadeRes`](#companyfacaderes) | — |  |

## CompanyDesignReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes |  |
| `code` | string | — |  |
| `description` | string | — |  |
| `features` | string | — |  |
| `minimumLotWidthInMeters` | number (double) | — |  |
| `minimumLotDepthInMeters` | number (double) | — |  |
| `areaInSquares` | number (double) | — |  |
| `storeys` | integer (int32) | — |  |
| `maximumCarsInGarage` | integer (int32) | — |  |
| `livingRooms` | integer (int32) | — |  |
| `bathrooms` | integer (int32) | — |  |
| `bedrooms` | integer (int32) | — |  |
| `renderCount` | integer (int32) | — |  |
| `elevationCount` | integer (int32) | — |  |
| `companyDesignStatus` | [`CompanyDesignStatus`](#companydesignstatus) | — |  |
| `baseCompanyDesignId` | string (uuid) | — | Groups all versions of the same CompanyDesign together. If null, this is the original/primary CompanyDesign with no versions. If populated, this record is a version of another CompanyDesign. |
| `version` | integer (int32) | — | Unique per Api.Poco.Dtos.CompanyDesign.CompanyDesignReq.BaseCompanyDesignId (or per CompanyDesign if BaseCompanyDesignId is null). Multiple versions of a CompanyDesign can be avaialble at the same time as indicated by Api.Poco.Dtos.CompanyDesign.CompanyDesignReq.CompanyDesignStatus. |
| `visibleOnWebsite` | boolean | — | When true, this CompanyDesign is visible on Company's website |
| `designId` | string (uuid) | — | If not null, implies imported design from system provided N:Api.Poco.Dtos.Design |

## CompanyDesignRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `companyId` | string (uuid) | — |  |
| `name` | string | — |  |
| `code` | string | — |  |
| `description` | string | — |  |
| `features` | string | — |  |
| `minimumLotWidthInMeters` | number (double) | — |  |
| `minimumLotDepthInMeters` | number (double) | — |  |
| `areaInSquares` | number (double) | — |  |
| `storeys` | integer (int32) | — |  |
| `maximumCarsInGarage` | integer (int32) | — |  |
| `livingRooms` | integer (int32) | — |  |
| `bathrooms` | integer (int32) | — |  |
| `bedrooms` | integer (int32) | — |  |
| `renderCount` | integer (int32) | — |  |
| `elevationCount` | integer (int32) | — |  |
| `companyDesignStatus` | [`CompanyDesignStatus`](#companydesignstatus) | — |  |
| `baseCompanyDesignId` | string (uuid) | — | Groups all versions of the same CompanyDesign together. If null, this is the original/primary CompanyDesign with no versions. If populated, this record is a version of another CompanyDesign. |
| `version` | integer (int32) | — | Unique per Api.Poco.Dtos.CompanyDesign.CompanyDesignRes.BaseCompanyDesignId (or per CompanyDesign if BaseCompanyDesignId is null). Multiple versions of a CompanyDesign can be avaialble at the same time as indicated by Api.Poco.Dtos.CompanyDesign.CompanyDesignRes.CompanyDesignStatus. |
| `visibleOnWebsite` | boolean | — | When true, this CompanyDesign is visible on Company's website |
| `designId` | string (uuid) | — | If not null, implies imported design from system provided N:Api.Poco.Dtos.Design |
| `blobMaps` | [`BlobMapRes`](#blobmapres)[] | — |  |
| `companyDesignBlobMaps` | [`BlobMapRes`](#blobmapres)[] | — |  |
| `companyDesignCustomFields` | [`CompanyDesignCustomFieldRes`](#companydesigncustomfieldres)[] | — |  |
| `companyDesignFacadeMaps` | [`CompanyDesignFacadeMapRes`](#companydesignfacademapres)[] | — |  |

## CompanyDesignResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`CompanyDesignRes`](#companydesignres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## CompanyDesignStatus

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`

## CompanyDesignsIFrameRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `iFrame` | string | — | The iframe with public data access token and style for embedding public company designs in public/external websites. |

## CompanyFacadeBlobMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `companyFacadeId` | string (uuid) | — |  |
| `blobModelId` | string (uuid) | — |  |
| `blobModel` | [`BlobModelRes`](#blobmodelres) | — |  |
| `blobMapOwnerEntityType` | [`BlobMapOwnerEntityType`](#blobmapownerentitytype) | — |  |
| `facadeBlobType` | [`FacadeBlobType`](#facadeblobtype) | — |  |

## CompanyFacadeReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes |  |
| `code` | string | — | Facade Code |
| `description` | string | — |  |
| `state` | [`State`](#state) | — |  |

## CompanyFacadeRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `companyId` | string (uuid) | — |  |
| `name` | string | — |  |
| `code` | string | — | Facade Code |
| `description` | string | — |  |
| `state` | [`State`](#state) | — |  |
| `blobMaps` | [`BlobMapRes`](#blobmapres)[] | — |  |
| `companyFacadeBlobMaps` | [`BlobMapRes`](#blobmapres)[] | — |  |

## CompanyFacadeResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`CompanyFacadeRes`](#companyfacaderes)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## CompanyMinARes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `name` | string | — |  |
| `abn` | string | — | Australian Business Number |
| `notificationEmail` | string | — | Email Id to which notifications such as Shift Start will be sent. In case this is not available, email the Owner's email id |
| `defaultOwner` | [`UserRes`](#userres) | — |  |
| `isApproved` | boolean | — | Indicates whether the Company was Approved or Rejected by an Admin |
| `approvedOrRejectedByUser` | [`UserRes`](#userres) | — |  |
| `approvedOrRejectedOnUtc` | string (date-time) | — |  |
| `isLocked` | boolean | — | When true, Users of this Company cannot generate Access Tokens |
| `lockedOnUtc` | string (date-time) | — |  |
| `reasonForLocking` | string | — |  |
| `lockedByUser` | [`UserMinRes`](#userminres) | — |  |
| `clickUpCompanyId` | string | — | Id of the company in ClickUp When this is null it indicates that clickup integration is not enabled. |

## CompanyMinAResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`CompanyMinARes`](#companyminares)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## CompanyRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `name` | string | — |  |
| `abn` | string | — | Australian Business Number |
| `notificationEmail` | string | — | Email Id to which notifications such as Shift Start will be sent. In case this is not available, email the Owner's email id |
| `address` | [`AddressRes`](#addressres) | — |  |
| `logoBlobUrl` | string | — | Public Url with readonly SAS of company Logo |
| `publicDataPermittedHostsCsv` | string | — | Comma separated list of permitted hosts from which public data can be accessed. e.g. "www.example.com,subdomain.example.com" These will be validated against the HTTP request Referrer header when fetching the blob. |
| `publicCompanyDesignStyle` | string | — | The value (could be string or json) for style attribute for the public company designs. |
| `clickUpCompanyId` | string | — | Id of the company in ClickUp When this is null it indicates that clickup integration is not enabled. |
| `currentSubscriptionPlanId` | string (uuid) | — | Current active subscription for this company |
| `currentSubscriptionPlan` | [`SubscriptionPlanRes`](#subscriptionplanres) | — |  |
| `currentSubscriptionPlanActivatedOnUtc` | string (date-time) | — |  |
| `currentSubscriptionPlanExpiresOnUtc` | string (date-time) | — | UTC date on which the current subscription plan expires. Null when no active subscription is assigned or the activation date is not set. |
| `currentSubscriptionPlanRenewsOnExpiry` | boolean | — | When true, it indicates that the current subscription plan is active and will be renewed on expiry date. When false, it indicates that the current subscription plan maybe active but will not be renewed once it expires. This indicates subscription was cancelled. |

## ConfirmEmailReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | string | yes | The email confirmation token/code. (url encoded) Note: The API sends url encoded email id; as a part of the confirm email token message.  This should be sent as the url encoded string. |
| `email` | string | yes | The email id (url encoded) Note: The API sends url encoded email id; as a part of the confirm email token message.  This should be sent as the url encoded string. |

## ContactMinRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `firstName` | string | — |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |
| `primaryEmail` | string | — |  |
| `secondaryEmail` | string | — |  |
| `primaryPhone` | string | — |  |
| `secondaryPhone` | string | — |  |
| `gender` | [`GenderType`](#gendertype) | — |  |
| `address` | [`AddressRes`](#addressres) | — |  |
| `notes` | string | — |  |

## ContactReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `notes` | string | — |  |
| `firstName` | string | yes |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |
| `primaryEmail` | string | — |  |
| `secondaryEmail` | string | — |  |
| `primaryPhone` | string | — |  |
| `secondaryPhone` | string | — |  |
| `gender` | [`GenderType`](#gendertype) | — |  |
| `address` | [`AddressReq`](#addressreq) | — |  |

## ContactRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `firstName` | string | — |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |
| `primaryEmail` | string | — |  |
| `secondaryEmail` | string | — |  |
| `primaryPhone` | string | — |  |
| `secondaryPhone` | string | — |  |
| `gender` | [`GenderType`](#gendertype) | — |  |
| `address` | [`AddressRes`](#addressres) | — |  |
| `notes` | string | — |  |
| `contactToContactTypeMaps` | [`ContactToContactTypeMapRes`](#contacttocontacttypemapres)[] | — |  |

## ContactResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`ContactRes`](#contactres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## ContactToContactTypeMapReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `contactId` | string (uuid) | — |  |
| `contactTypeId` | string (uuid) | — |  |

## ContactToContactTypeMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `contact` | [`ContactMinRes`](#contactminres) | — |  |
| `contactType` | [`ContactTypeRes`](#contacttyperes) | — |  |

## ContactToContactTypeMapResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`ContactToContactTypeMapRes`](#contacttocontacttypemapres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## ContactTypeReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | string | — | e.g Structural Engineer, Tiler, Plumber, lotOwner, etc. |

## ContactTypeRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `value` | string | — | e.g Structural Engineer, Tiler, Plumber, lotOwner, etc. |
| `companyId` | string (uuid) | — | When null, it means this ContactType is available to all Companies and is managed by Admins. |

## DateOnly

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `year` | integer (int32) | — |  |
| `month` | integer (int32) | — |  |
| `day` | integer (int32) | — |  |
| `dayOfWeek` | [`DayOfWeek`](#dayofweek) | — |  |
| `dayOfYear` | integer (int32) | — |  |
| `dayNumber` | integer (int32) | — |  |

## DateTimeInterval

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `startTimeUtc` | string (date-time) | — |  |
| `endTimeUtc` | string (date-time) | — |  |

## DayOfWeek

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`, `4`, `5`, `6`

## DesignAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes |  |
| `code` | string | — |  |
| `description` | string | — |  |
| `features` | string | — |  |
| `minimumLotWidthInMeters` | number (double) | — |  |
| `minimumLotDepthInMeters` | number (double) | — |  |
| `areaInSquares` | number (double) | — |  |
| `storeys` | integer (int32) | — |  |
| `maximumCarsInGarage` | integer (int32) | — |  |
| `livingRooms` | integer (int32) | — |  |
| `bathrooms` | integer (int32) | — |  |
| `bedrooms` | integer (int32) | — |  |
| `renderCount` | integer (int32) | — |  |
| `elevationCount` | integer (int32) | — |  |
| `designStatus` | [`DesignStatus`](#designstatus) | — |  |
| `baseDesignId` | string (uuid) | — | Groups all versions of the same design together. If null, this is the original/primary design with no versions. If populated, this record is a version of another design. |
| `version` | integer (int32) | — | Unique per Api.Poco.Dtos.Design.DesignAReq.BaseDesignId (or per design if BaseDesignId is null). Multiple versions of a Design can be avaialble at the same time as indicated by Api.Poco.Dtos.Design.DesignAReq.DesignStatus. |

## DesignBlobMapARes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `designId` | string (uuid) | — |  |
| `blobModelId` | string (uuid) | — |  |
| `blobModel` | [`BlobModelRes`](#blobmodelres) | — |  |
| `designBlobType` | [`DesignBlobType`](#designblobtype) | — |  |

## DesignBlobMapAResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`DesignBlobMapARes`](#designblobmapares)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## DesignBlobType

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`, `4`

## DesignCustomFieldAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `designId` | string (uuid) | — |  |
| `name` | string | yes |  |
| `value` | string | — |  |
| `group` | string | — | The name of the group this custom field belongs to. This is used in the UI to show related custom fields together. e.g. Room Dimensions |

## DesignCustomFieldARes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `designId` | string (uuid) | — |  |
| `name` | string | — |  |
| `value` | string | — |  |
| `group` | string | — | The name of the group this custom field belongs to. This is used in the UI to show related custom fields together. e.g. Room Dimensions |

## DesignFacadeMapReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `designId` | string (uuid) | — |  |
| `facadeId` | string (uuid) | — |  |

## DesignFacadeMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `designId` | string (uuid) | — |  |
| `facadeId` | string (uuid) | — |  |
| `facade` | [`FacadeRes`](#facaderes) | — |  |

## DesignFacadeMapResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`DesignFacadeMapRes`](#designfacademapres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## DesignRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `name` | string | — |  |
| `code` | string | — |  |
| `description` | string | — |  |
| `features` | string | — |  |
| `minimumLotWidthInMeters` | number (double) | — |  |
| `minimumLotDepthInMeters` | number (double) | — |  |
| `areaInSquares` | number (double) | — |  |
| `storeys` | integer (int32) | — |  |
| `maximumCarsInGarage` | integer (int32) | — |  |
| `livingRooms` | integer (int32) | — |  |
| `bathrooms` | integer (int32) | — |  |
| `bedrooms` | integer (int32) | — |  |
| `renderCount` | integer (int32) | — |  |
| `elevationCount` | integer (int32) | — |  |
| `designStatus` | [`DesignStatus`](#designstatus) | — |  |
| `baseDesignId` | string (uuid) | — | Groups all versions of the same design together. If null, this is the original/primary design with no versions. If populated, this record is a version of another design. |
| `version` | integer (int32) | — | Unique per Api.Poco.Dtos.Design.DesignRes.BaseDesignId (or per design if BaseDesignId is null). Multiple versions of a Design can be avaialble at the same time as indicated by Api.Poco.Dtos.Design.DesignRes.DesignStatus. |
| `designBlobMaps` | [`DesignBlobMapARes`](#designblobmapares)[] | — |  |
| `designCustomFields` | [`DesignCustomFieldARes`](#designcustomfieldares)[] | — |  |
| `designFacadeMaps` | [`DesignFacadeMapRes`](#designfacademapres)[] | — |  |

## DesignResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`DesignRes`](#designres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## DesignStatus

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`

## DesignationReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | — | Unique name of the designation e.g. Supervisor, Tradie, Project Manager etc |
| `description` | string | — |  |

## DesignationRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `name` | string | — | Unique name of the designation e.g. Supervisor, Tradie, Project Manager etc |
| `description` | string | — |  |
| `designationToModuleAppRoleMaps` | [`DesignationToModuleAppRoleMapRes`](#designationtomoduleapprolemapres)[] | — |  |

## DesignationResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`DesignationRes`](#designationres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## DesignationToAppUserMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `designation` | [`DesignationRes`](#designationres) | — |  |
| `appUser` | [`UserRes`](#userres) | — |  |

## DesignationToModuleAppRoleMapReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `designationId` | string (uuid) | — |  |
| `moduleAppRoleId` | string (uuid) | — |  |

## DesignationToModuleAppRoleMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `designation` | [`DesignationRes`](#designationres) | — |  |
| `moduleAppRole` | [`ModuleAppRoleRes`](#moduleapproleres) | — |  |

## DrivewayType

**Type:** `integer` enum

Values: `0`, `1`, `2`

## EmailTemplateAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `senderName` | string | yes | Sender's name that will appear in the email |
| `senderEmail` | string | yes | Sender's email  e.g. noreply@your-domain.com |
| `templateSubject` | string | yes | Dynamic properties will be substituted  e.g. {{firstname}} => John |
| `templateHtmlBody` | string | yes | Dynamic properties will be substituted  e.g. {{firstname}} => John |
| `description` | string | — |  |
| `emailType` | [`EmailType`](#emailtype) | — |  |

## EmailTemplateARes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `senderName` | string | — | Sender's name that will appear in the email |
| `senderEmail` | string | — | Sender's email  e.g. noreply@your-domain.com |
| `templateSubject` | string | — | Dynamic properties will be substituted  e.g. {{firstname}} => John |
| `templateHtmlBody` | string | — | Dynamic properties will be substituted  e.g. {{firstname}} => John |
| `description` | string | — |  |
| `emailType` | [`EmailType`](#emailtype) | — |  |

## EmailTemplateAResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`EmailTemplateARes`](#emailtemplateares)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## EmailType

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`, `50`, `51`, `52`, `53`

## EnumRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | — | Can be numeric string or Guid |
| `value` | string | — |  |

## ErrorDto

An object of this class would be sent as a response, when as exception is thrown or an error occurs.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `dateTimeUtc` | string (date-time) | — | The UTC when this exception was being handled. |
| `errorReference` | string | — | The Id that has been logged by the ErrorLogger.  The end user may be prompted to send this to the customer care to help fixing the causing issue.  This is used to search the LogEntries table. An Guid.Empty value indicates that there was no exception thrown by ErrorLogger. |
| `errorType` | [`ErrorType`](#errortype) | — |  |
| `title` | string | — | The summarized, user-friendly title for the exception |
| `code` | string | — | Certain types of business exception have a unique code. E.g. ErrorType.Action Such codes can be used by the UI to uniquely identify an error and redirect the user to a custom UI action. |
| `messages` | string[] | — | Userfriendly error messages. |

## ErrorType

**Type:** `integer` enum

Values: `0`, `1`

## ExternalApiProviderType

Name of the external Api provider

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`, `4`, `5`

## FacadeBlobMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `facadeId` | string (uuid) | — |  |
| `blobModelId` | string (uuid) | — |  |
| `blobModel` | [`BlobModelRes`](#blobmodelres) | — |  |
| `facadeBlobType` | [`FacadeBlobType`](#facadeblobtype) | — |  |

## FacadeBlobMapResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`FacadeBlobMapRes`](#facadeblobmapres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## FacadeBlobType

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`, `4`

## FacadeReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes |  |
| `code` | string | — | Facade Code |
| `description` | string | — |  |
| `state` | [`State`](#state) | — |  |

## FacadeRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `name` | string | — |  |
| `code` | string | — | Facade Code |
| `description` | string | — |  |
| `state` | [`State`](#state) | — |  |
| `facadeBlobMaps` | [`FacadeBlobMapRes`](#facadeblobmapres)[] | — |  |

## FacadeResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`FacadeRes`](#facaderes)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## ForgotPasswordReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string (email) | yes |  |

## ForgotPasswordRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `resetPasswordUrl` | string | — |  |

## GenderType

**Type:** `integer` enum

Values: `0`, `1`, `2`

## HtmlPageTemplateAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | string | — |  |
| `htmlTemplate` | string | yes |  |
| `menuPaths` | string | — | Menus or MenuPaths on UI to show this template on. These can be multiple menus separated by comma. e.g. "Dashboard,Settings/Integrations" |
| `companyId` | string (uuid) | — | Company to which this belongs. When null, it means this is available to all companies. |

## HtmlPageTemplateARes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `description` | string | — |  |
| `htmlTemplate` | string | — |  |
| `menuPaths` | string | — | Menus or MenuPaths on UI to show this template on. These can be multiple menus separated by comma. e.g. "Dashboard,Settings/Integrations" |
| `companyId` | string (uuid) | — | Company to which this belongs. When null, it means this is available to all companies. |

## HtmlPageTemplateAResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`HtmlPageTemplateARes`](#htmlpagetemplateares)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## HtmlPageTemplatePageRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `description` | string | — |  |
| `menuPaths` | string | — | Menus or MenuPaths on UI to show this template on. These can be multiple menus separated by comma. e.g. "Dashboard,Settings/Integrations" |
| `companyId` | string (uuid) | — | Company to which this belongs. When null, it means this is available to all companies. |

## HtmlPageTemplatePageResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`HtmlPageTemplatePageRes`](#htmlpagetemplatepageres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## HtmlStringToPdfReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `masterPassword` | string | — |  |
| `password` | string | — |  |
| `htmlFileContent` | string | yes |  |
| `pdfServiceType` | [`PdfServiceType`](#pdfservicetype) | — |  |

## HttpExecuteQueryReq

DTO for UI

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `queryParams` | object | — |  |
| `additionalQueryStringParams` | object | — | Query given by ActionId will already have QuerySTring parameters. But some paramsters are dynamic, they need can be specifed here. e.g. start_cursor can change with every page      { "start_cursor", "eyJjcmVhdGVkX2F0IjoiMjAyN" } |
| `headers` | object | — |  |
| `bodyJsonObject` | [`JsonNode`](#jsonnode) | — |  |

## HttpQueryAppRoleMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `httpQueryId` | string (uuid) | — |  |
| `appRoleId` | string (uuid) | — |  |
| `appRole` | [`AppRoleRes`](#approleres) | — |  |

## HttpQueryReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `apiBaseUrl` | string | yes | e.g. https://api.fleetio.com |
| `endpointUri` | string | yes | e.g. api/v2/issues |
| `queryTemplate` | string | — |  |
| `actionId` | integer (int64) | yes | Unique user specified ActionId that is sent by UI and used by API to determine which query to fetch from DB and execute. This is similar to Id but user specified for a better control. |
| `description` | string | — |  |
| `httpVerb` | [`HttpVerb`](#httpverb) | — |  |
| `externalApiProvider` | [`ExternalApiProviderType`](#externalapiprovidertype) | — |  |
| `companyId` | string (uuid) | yes |  |

## HttpQueryRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `apiBaseUrl` | string | — | e.g. https://api.fleetio.com |
| `endpointUri` | string | — | e.g. api/v2/issues |
| `queryTemplate` | string | — |  |
| `actionId` | integer (int64) | — | Unique user specified ActionId that is sent by UI and used by API to determine which query to fetch from DB and execute. This is similar to Id but user specified for a better control. |
| `description` | string | — |  |
| `httpVerb` | [`HttpVerb`](#httpverb) | — |  |
| `externalApiProvider` | [`ExternalApiProviderType`](#externalapiprovidertype) | — |  |
| `companyId` | string (uuid) | — |  |
| `httpQueryAppRoleMap` | [`HttpQueryAppRoleMapRes`](#httpqueryapprolemapres)[] | — |  |

## HttpQueryResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`HttpQueryRes`](#httpqueryres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## HttpVerb

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`, `4`

## InviteStaffRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | string | — | Message to be displayed to the user. |
| `staffUser` | [`StaffRes`](#staffres) | — |  |

## JsonNode

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | [`JsonNodeOptions`](#jsonnodeoptions) | — |  |
| `parent` | [`JsonNode`](#jsonnode) | — |  |
| `root` | [`JsonNode`](#jsonnode) | — |  |

## JsonNodeOptions

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `propertyNameCaseInsensitive` | boolean | — |  |

## LandType

Describes the shape or configuration of a land parcel.

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`

## LeadActivityLogPageReq

Paginated request for activity logs scoped to a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `pageNumber` | integer (int32) | yes | The page number. |
| `pageSize` | integer (int32) | yes | The number of entities expected on a page. |

## LeadActivityLogReq

Request DTO for adding a manual activity entry to a lead timeline.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | [`LeadActivityLogType`](#leadactivitylogtype) | yes |  |
| `summary` | string | yes | Concise timeline text. |
| `details` | string | — | Optional extended content for this activity. |
| `occurredOnUtc` | string (date-time) | — | Optional event timestamp, defaults to current UTC when omitted. |
| `metadataJson` | string | — | Optional structured metadata payload for future use. |

## LeadActivityLogRes

Response DTO representing a timeline activity on a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `leadId` | string (uuid) | — | Lead this activity belongs to. |
| `type` | [`LeadActivityLogType`](#leadactivitylogtype) | — |  |
| `source` | [`LeadActivitySourceType`](#leadactivitysourcetype) | — |  |
| `summary` | string | — | Concise timeline text. |
| `details` | string | — | Optional extended content for this activity. |
| `occurredOnUtc` | string (date-time) | — | UTC timestamp for when the event happened. |
| `performedByUserId` | string (uuid) | — | User Id of the actor who performed the event, when known. |
| `performedByName` | string | — | Display name captured for timeline rendering. |
| `metadataJson` | string | — | Optional metadata payload in JSON form. |

## LeadActivityLogResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`LeadActivityLogRes`](#leadactivitylogres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## LeadActivityLogType

Supported lead activity event categories for the sales timeline.

**Type:** `integer` enum

Values: `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`

## LeadActivitySourceType

Identifies how a lead activity entry was produced.

**Type:** `integer` enum

Values: `1`, `2`

## LeadBlobMapRes

Response DTO for a lead blob (file) association.
Contains the blob metadata and file type.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `leadId` | string (uuid) | — | ID of the lead that the blob is associated with. |
| `blobModelId` | string (uuid) | — | ID of the blob model (file). |
| `blobModel` | [`BlobModelRes`](#blobmodelres) | — |  |
| `blobMapOwnerEntityType` | [`BlobMapOwnerEntityType`](#blobmapownerentitytype) | — |  |
| `leadBlobType` | [`LeadBlobType`](#leadblobtype) | — |  |

## LeadBlobType

**Type:** `integer` enum

Values: `0`, `1`

## LeadContactRes

Response DTO representing a contact associated with a lead (join table record).

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | The ID of the lead contact association. |
| `contactId` | string (uuid) | — | The ID of the contact. |
| `contact` | [`ContactMinRes`](#contactminres) | — |  |

## LeadDesignReq

Request DTO for associating a company design with a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `leadId` | string (uuid) | yes | The lead that will receive the design association. |
| `companyDesignId` | string (uuid) | yes | The company design to link to the lead. |

## LeadDesignRes

Response DTO representing a design linked to a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `leadId` | string (uuid) | — | Lead this design association belongs to. |
| `companyDesignId` | string (uuid) | — | The linked company design. |

## LeadPriority

Represents the priority level of a Sales Lead.

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`

## LeadQuoteLineItemReq

Request DTO for creating or updating a quotation line item.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `leadQuoteId` | string (uuid) | yes | Lead quote this line item belongs to. |
| `category` | string | yes | Category grouping for this line item (e.g. "Labour", "Materials"). |
| `description` | string | yes | Detailed description of the work or material being quoted. |
| `qty` | number (double) | — | Quantity of units. |
| `unitPrice` | number (double) | — | Price per unit. |
| `sortOrder` | integer (int32) | — | Display order of this item within the quotation. |
| `isVisible` | boolean | — | Controls whether this line item is visible on the printed/exported quotation. |

## LeadQuoteLineItemRes

Response DTO representing a line item within a lead quote.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `leadQuoteId` | string (uuid) | — | Lead quote this line item belongs to. |
| `category` | string | — | Category grouping for this line item. |
| `description` | string | — | Detailed description of the work or material. |
| `qty` | number (double) | — | Quantity of units. |
| `unitPrice` | number (double) | — | Price per unit. |
| `sortOrder` | integer (int32) | — | Display order of this item within the quotation. |
| `isVisible` | boolean | — | Controls whether this line item is visible on the printed/exported quotation. |

## LeadQuotePageReq

Paginated request for lead quotes belonging to a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `pageNumber` | integer (int32) | yes | The page number. |
| `pageSize` | integer (int32) | yes | The number of entities expected on a page. |

## LeadQuoteReq

Request DTO for creating or updating a lead quote on a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | string | yes | Short title identifying this quotation (e.g. "Initial Proposal Q1"). |
| `description` | string | — | Optional free-text description or scope summary. |
| `isVariantOfLeadQuoteId` | string (uuid) | — | Lead quote id this quote is a variant of. Null indicates this quote is an original (not a variant). |
| `variantOrder` | integer (int32) | — | Numeric order of this variant within its group (null if not a variant). |
| `validUntilUtc` | string (date-time) | — | Optional date/time (UTC) after which this quotation is no longer valid. |

## LeadQuoteRes

Response DTO representing a lead quote on a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `leadId` | string (uuid) | — | Lead this quotation belongs to. |
| `title` | string | — | Short title identifying this quotation. |
| `description` | string | — | Optional free-text description or scope summary. |
| `status` | [`LeadQuoteStatus`](#leadquotestatus) | — |  |
| `version` | integer (int32) | — | Revision number of the quotation. |
| `isVariantOfLeadQuoteId` | string (uuid) | — | Lead quote id this quote is a variant of (null for original quotes). |
| `variantOrder` | integer (int32) | — | Numeric variant order within its group. |
| `validUntilUtc` | string (date-time) | — | Optional date/time (UTC) after which this quotation is no longer valid. |
| `variants` | [`LeadQuoteVariantRes`](#leadquotevariantres)[] | — | Variants that reference this quote as their base quote. |
| `lineItems` | [`LeadQuoteLineItemRes`](#leadquotelineitemres)[] | — | Line items included with this quotation (populated when fetched by ID). |

## LeadQuoteResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`LeadQuoteRes`](#leadquoteres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## LeadQuoteStatus

Represents the status of a Sales LeadQuote.
Terminal states are Accepted and Rejected — no further transitions are permitted.

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`

## LeadQuoteStatusReq

Request DTO for updating a lead quote status.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | [`LeadQuoteStatus`](#leadquotestatus) | yes |  |

## LeadQuoteVariantRes

Lightweight response DTO representing a variant quote associated with a base lead quote.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `leadId` | string (uuid) | — | Lead this quotation belongs to. |
| `title` | string | — | Short title identifying this quotation. |
| `description` | string | — | Optional free-text description or scope summary. |
| `status` | [`LeadQuoteStatus`](#leadquotestatus) | — |  |
| `version` | integer (int32) | — | Revision number of the quotation. |
| `isVariantOfLeadQuoteId` | string (uuid) | — | Lead quote id this quote is a variant of (always set for variants). |
| `variantOrder` | integer (int32) | — | Numeric variant order within its variant group. |
| `validUntilUtc` | string (date-time) | — | Optional date/time (UTC) after which this quotation is no longer valid. |

## LeadReq

Request DTO for creating or updating a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `contactIds` | string[] | yes | One or more company contacts (owners) selected for the lead. |
| `notes` | string | — | Free-text notes about the lead. |
| `status` | [`LeadStatus`](#leadstatus) | — |  |
| `leadStageId` | string (uuid) | — | Optional pipeline stage the lead belongs to. |
| `assignedUserId` | string (uuid) | — | Optional user assigned to own this lead. |
| `priority` | [`LeadPriority`](#leadpriority) | — |  |
| `clientBudget` | number (double) | — | Budget allocated by the client for this lead. |
| `totalHouseCost` | number (double) | — | Estimated total cost to build the house. |
| `siteAddressId` | string (uuid) | — | Links the lead to an existing address by ID. Mutually exclusive with Api.Poco.Dtos.Sales.LeadReq.SiteAddress. |
| `siteAddress` | [`AddressReq`](#addressreq) | — |  |
| `landWidthInMetres` | number (double) | — | Width of the land in metres. |
| `landDepthInMetres` | number (double) | — | Depth of the land in metres. |
| `houseAreaInSquareMetres` | number (double) | — | Total area of the house in square metres. |
| `landSizeInSquareMetres` | number (double) | — | Total area of the land in square metres. |
| `lotNo` | string | — | Lot number of the land parcel. |
| `titleDateUtc` | [`DateOnly`](#dateonly) | — |  |
| `settlementDateUtc` | [`DateOnly`](#dateonly) | — |  |
| `driveway` | [`DrivewayType`](#drivewaytype) | — |  |
| `developer` | string | — | Name of the land developer or estate. |
| `bushFire` | boolean | — | Indicates whether the site is in a bushfire-prone zone. |
| `landType` | [`LandType`](#landtype) | — |  |

## LeadRes

Response DTO representing a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `sequenceNumber` | integer (int32) | — | Auto-incremented lead reference number scoped to the company. |
| `leadContacts` | [`LeadContactRes`](#leadcontactres)[] | — | The contacts (owners) associated with the lead. |
| `notes` | string | — | Free-text notes about the lead. |
| `status` | [`LeadStatus`](#leadstatus) | — |  |
| `leadStageId` | string (uuid) | — | Optional pipeline stage the lead belongs to. |
| `assignedUserId` | string (uuid) | — | Optional user assigned to own this lead. |
| `priority` | [`LeadPriority`](#leadpriority) | — |  |
| `clientBudget` | number (double) | — | Budget allocated by the client for this lead. |
| `totalHouseCost` | number (double) | — | Estimated total cost to build the house. |
| `siteAddress` | [`AddressRes`](#addressres) | — |  |
| `landWidthInMetres` | number (double) | — | Width of the land in metres. |
| `landDepthInMetres` | number (double) | — | Depth of the land in metres. |
| `houseAreaInSquareMetres` | number (double) | — | Total area of the house in square metres. |
| `landSizeInSquareMetres` | number (double) | — | Total area of the land in square metres. |
| `lotNo` | string | — | Lot number of the land parcel. |
| `titleDateUtc` | [`DateOnly`](#dateonly) | — |  |
| `settlementDateUtc` | [`DateOnly`](#dateonly) | — |  |
| `driveway` | [`DrivewayType`](#drivewaytype) | — |  |
| `developer` | string | — | Name of the land developer or estate. |
| `bushFire` | boolean | — | Indicates whether the site is in a bushfire-prone zone. |
| `landType` | [`LandType`](#landtype) | — |  |
| `leadDesigns` | [`LeadDesignRes`](#leaddesignres)[] | — | Design associations linked to the lead. |
| `blobMaps` | [`LeadBlobMapRes`](#leadblobmapres)[] | — | File attachments associated with the lead. |

## LeadResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`LeadRes`](#leadres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## LeadStageReorderReq

Request item used to reorder lead stages.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `stageId` | string (uuid) | yes | The stage to reorder. |
| `sortOrder` | integer (int32) | — | The new one-based sort order. |

## LeadStageReq

Request DTO for creating or updating a lead stage.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Display name of the stage (e.g. "Contacted", "Proposal"). |
| `colour` | string | — | Optional hex colour code used to visually identify the stage (e.g. "#0D6EFD"). |
| `sortOrder` | integer (int32) | — | Numeric sort position relative to other stages for the same company. |

## LeadStageRes

Response DTO representing a lead stage.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `name` | string | — | Display name of the stage. |
| `colour` | string | — | Optional hex colour code for the stage. |
| `sortOrder` | integer (int32) | — | Numeric sort position relative to other stages. |

## LeadStatus

Represents the status of a Sales Lead.

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`, `4`, `5`, `6`

## LeadStatusReq

Request DTO for updating a lead status.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | [`LeadStatus`](#leadstatus) | yes |  |

## LeadTaskReq

Request DTO for creating or updating a task on a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | string | yes | Short descriptive title of the task. |
| `description` | string | — | Optional detailed description of what the task involves. |
| `status` | [`LeadTaskStatus`](#leadtaskstatus) | — |  |
| `dueDate` | string (date-time) | — | Optional date by which the task should be completed. |
| `assignedUserId` | string (uuid) | — | Optional user assigned to complete this task. |

## LeadTaskRes

Response DTO representing a task on a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `leadId` | string (uuid) | — | Lead this task belongs to. |
| `title` | string | — | Short descriptive title of the task. |
| `description` | string | — | Optional detailed description. |
| `status` | [`LeadTaskStatus`](#leadtaskstatus) | — |  |
| `dueDate` | string (date-time) | — | Optional due date for the task. |
| `assignedUserId` | string (uuid) | — | Optional user assigned to complete this task. |

## LeadTaskResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`LeadTaskRes`](#leadtaskres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## LeadTaskStatus

Represents the status of a task associated with a Sales Lead.

**Type:** `integer` enum

Values: `0`, `1`, `2`

## LeadTaskStatusReq

Request DTO for updating a sales lead task status.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | [`LeadTaskStatus`](#leadtaskstatus) | yes |  |

## LeadUpdateStageReq

Request DTO for moving a lead to a different stage.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `leadStageId` | string (uuid) | — | The target stage identifier, or null to clear the stage. |

## LockCompanyAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `companyId` | string (uuid) | yes |  |
| `reasonForLocking` | string | — |  |

## LoginExternalReq

Login using External Idenetity Providers e.g. Microsoft, Google

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `idToken` | string | yes | Id Token returned to UI after user logs in using External Identity Provider's Server |
| `clientId` | string | yes | ClientId required by our Identity Server. e.g. WebApp |
| `termsAndConditionsUrl` | string | — | Public Url associated with the Terms and Conditions accepted by the user UI will send this value when the user has accepted. Null when there are new terms and conditions or if user has not accepted yet. |

## MessageResponseDto

Wraps the common properties required by most of the Response Dtos

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | string | — | Represents a userfriendly message. |

## ModuleAppRoleReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `moduleType` | string | yes |  |
| `modulePermissionType` | string | yes |  |
| `modulePermissionModifier` | string | yes |  |
| `isAvailable` | boolean | — | When true, this will be visible/usable in the UI Admin can reset it to become unavailable if needed |

## ModuleAppRoleRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `moduleType` | string | — |  |
| `modulePermissionType` | string | — |  |
| `modulePermissionModifier` | string | — |  |
| `isAvailable` | boolean | — | When true, this will be visible/usable in the UI Admin can reset it to become unavailable if needed |

## ModuleAppRoleResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`ModuleAppRoleRes`](#moduleapproleres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## PagedReq

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `pageNumber` | integer (int32) | yes | The page number. |
| `pageSize` | integer (int32) | yes | The number of entities expected on a page. |

## PaymentStatus

Status of a payment

**Type:** `integer` enum

Values: `1`, `2`, `3`, `4`, `5`

## PdfServiceType

The types of coverters available for Pdf services

**Type:** `integer` enum

Values: `0`, `1`, `2`

## ProcessMessageItem

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `messageId` | string | — | Usually a Guid |
| `hasError` | boolean | — |  |
| `errorDetails` | string | — | Populated if Api.Poco.AzureQueue.ProcessMessageItem.HasError is true. |

## ProcessMessageRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `successfulMessages` | [`ProcessMessageItem`](#processmessageitem)[] | — | Messages that were processed successfully. |
| `deletedMessages` | [`ProcessMessageItem`](#processmessageitem)[] | — | Messages that were deleted from the queue after successful processing. |
| `failedMessages` | [`ProcessMessageItem`](#processmessageitem)[] | — | Messages that failed to process. |
| `poisonMessages` | [`ProcessMessageItem`](#processmessageitem)[] | — | Messages that were moved to poison queue due to exceeding max retry attempts. |

## PublicBlobModelRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `fileName` | string | — | abc.png |
| `description` | string | — |  |
| `updatedOnUtc` | string (date-time) | — |  |
| `sasToken` | string | — | SAS token which can be used to download this blob |
| `sasUrl` | string | — | Url with SASToken which can be used to download this blob. |
| `inlineOpenSasToken` | string | — | SAS token which can be used to open this blob |
| `inlineOpenSasUrl` | string | — | Url opens in browser inline (for e.g. images, pdf etc.) |
| `expiresOnUtc` | string (date-time) | — |  |
| `previewSasToken` | string | — | SAS token which can be used to download this blob's preview |
| `previewSasUrl` | string | — | Url with SASToken which can be used to directly access this blob's preview. |
| `previewInlineOpenSasToken` | string | — | SAS token which can be used to open this blob's preview |
| `previewInlineOpenSasUrl` | string | — | Url opens in browser inline (for e.g. images, pdf etc.) |
| `previewExpiresOnUtc` | string (date-time) | — |  |

## PublicCompanyDesignBlobMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `blobModel` | [`PublicBlobModelRes`](#publicblobmodelres) | — |  |
| `blobMapOwnerEntityType` | [`BlobMapOwnerEntityType`](#blobmapownerentitytype) | — |  |
| `designBlobType` | [`DesignBlobType`](#designblobtype) | — |  |

## PublicCompanyDesignCustomFieldRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `name` | string | — |  |
| `value` | string | — |  |
| `group` | string | — | The name of the group this custom field belongs to. This is used in the UI to show related custom fields together. e.g. Room Dimensions |

## PublicCompanyDesignFacadeMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `companyFacadeId` | string (uuid) | — |  |
| `companyFacade` | [`PublicCompanyFacadeRes`](#publiccompanyfacaderes) | — |  |

## PublicCompanyDesignRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `updatedOnUtc` | string (date-time) | — |  |
| `name` | string | — |  |
| `code` | string | — |  |
| `description` | string | — |  |
| `features` | string | — |  |
| `minimumLotWidthInMeters` | number (double) | — |  |
| `minimumLotDepthInMeters` | number (double) | — |  |
| `areaInSquares` | number (double) | — |  |
| `storeys` | integer (int32) | — |  |
| `maximumCarsInGarage` | integer (int32) | — |  |
| `livingRooms` | integer (int32) | — |  |
| `bathrooms` | integer (int32) | — |  |
| `bedrooms` | integer (int32) | — |  |
| `renderCount` | integer (int32) | — |  |
| `elevationCount` | integer (int32) | — |  |
| `companyDesignStatus` | [`CompanyDesignStatus`](#companydesignstatus) | — |  |
| `blobMaps` | [`PublicCompanyDesignBlobMapRes`](#publiccompanydesignblobmapres)[] | — |  |
| `companyDesignBlobMaps` | [`PublicCompanyDesignBlobMapRes`](#publiccompanydesignblobmapres)[] | — |  |
| `companyDesignCustomFields` | [`PublicCompanyDesignCustomFieldRes`](#publiccompanydesigncustomfieldres)[] | — |  |
| `companyDesignFacadeMaps` | [`PublicCompanyDesignFacadeMapRes`](#publiccompanydesignfacademapres)[] | — |  |

## PublicCompanyDesignResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`PublicCompanyDesignRes`](#publiccompanydesignres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## PublicCompanyFacadeBlobMapRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `companyFacadeId` | string (uuid) | — |  |
| `blobModelId` | string (uuid) | — |  |
| `blobModel` | [`PublicBlobModelRes`](#publicblobmodelres) | — |  |
| `blobMapOwnerEntityType` | [`BlobMapOwnerEntityType`](#blobmapownerentitytype) | — |  |
| `facadeBlobType` | [`FacadeBlobType`](#facadeblobtype) | — |  |

## PublicCompanyFacadeRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `name` | string | — |  |
| `code` | string | — | Facade Code |
| `description` | string | — |  |
| `state` | [`State`](#state) | — |  |
| `blobMaps` | [`PublicCompanyFacadeBlobMapRes`](#publiccompanyfacadeblobmapres)[] | — |  |
| `companyFacadeBlobMaps` | [`PublicCompanyFacadeBlobMapRes`](#publiccompanyfacadeblobmapres)[] | — |  |

## QuoteTemplateReq

Request DTO for creating or updating a quote template.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | string | yes | Category grouping for this template. |
| `description` | string | yes | Human-readable description shown for the template. |
| `bodyJson` | string | yes | UI-managed JSON payload associated with the template. |

## QuoteTemplateRes

Response DTO representing a reusable quote template.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `category` | string | — | Category grouping for this template. |
| `description` | string | — | Human-readable description shown for the template. |
| `bodyJson` | string | — | UI-managed JSON payload associated with the template. |

## ReadResponse

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `range` | string | — |  |
| `majorDimension` | string | — |  |
| `values` | array[] | — |  |

## RegisterCompanyAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | — |  |
| `abn` | string | — | Australian Business Number |
| `notificationEmail` | string | — | Email Id to which notifications such as Shift Start will be sent. In case this is not available, email will be sent to the Owner's email id |
| `defaultOwner` | [`RegisterCompanyOwnerUserReq`](#registercompanyowneruserreq) | yes |  |
| `address` | [`AddressReq`](#addressreq) | yes |  |

## RegisterCompanyOwnerUserReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string (email) | yes |  |
| `password` | string (password) | yes |  |
| `phoneNumber` | string (tel) | yes | Must be a mobile phone number |
| `firstName` | string | — |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |

## RegisterUserReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string (email) | yes |  |
| `password` | string (password) | yes |  |

## ResetPasswordReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string (email) | yes | The Email Id(Url encoded) Note: The API sends url encoded email id; as a part of the confirm reset password token message.  This should be sent as the url encoded string. |
| `newPassword` | string (password) | yes |  |
| `passwordResetToken` | string | yes | The password reset token received in the email. (Url encoded) Note: The API sends url encoded email id; as a part of the reset password token message.  This should be sent as the url encoded string. |

## ResourceOwnerRefreshTokenReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `accessToken` | string | yes |  |
| `refreshToken` | string | yes |  |

## ResourceOwnerTokenReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `userName` | string | yes |  |
| `password` | string | yes |  |
| `rememberMe` | boolean | — | Specify this as true to generate Refresh Token |
| `termsAndConditionsUrl` | string | — | Public Url associated with the Terms and Conditions accepted by the user UI will send this value when the user has accepted. Null when there are new terms and conditions or if user has not accepted yet. |
| `emailOtpCode` | string | — | Email OTP code used when the account has email-based 2FA enabled. |

## ResourceOwnerTokenRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `accessToken` | string | — |  |
| `tokenType` | string | — |  |
| `expiresIn` | integer (int64) | — |  |
| `refreshToken` | string | — |  |
| `userName` | string | — |  |
| `user` | [`ResourceOwnerTokenUserRes`](#resourceownertokenuserres) | — |  |
| `company` | [`TokenCompanyRes`](#tokencompanyres) | — |  |
| `requiresTwoFactor` | boolean | — |  |
| `twoFactorMethod` | string | — |  |
| `twoFactorDestinationMasked` | string | — |  |
| `message` | string | — |  |

## ResourceOwnerTokenUserRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `email` | string | — |  |
| `firstName` | string | — |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |
| `termsAndConditionsAcceptedOnUtc` | string (date-time) | — | The timestamp when the user accepted the Terms and Conditions on the Api.Poco.Dtos.User.ResourceOwnerTokenUserRes.TermsAndConditionsUrl Null when there are new terms and conditions or if user has not accepted yet. |
| `termsAndConditionsUrl` | string | — | Public Url associated with the Terms and Conditions accepted by the user UI will send this value when the user has accepted. Null when there are new terms and conditions or if user has not accepted yet. |

## SalesLeadTaskPageReq

Paginated request for tasks belonging to a lead.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `pageNumber` | integer (int32) | yes | The page number. |
| `pageSize` | integer (int32) | yes | The number of entities expected on a page. |

## SendConfirmEmailTokenReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string (email) | yes |  |

## StaffReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `firstName` | string | yes |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |
| `phoneNumber` | string | — | Mobile phone |
| `email` | string (email) | yes |  |
| `address` | [`AddressReq`](#addressreq) | — |  |

## StaffRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `firstName` | string | — |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |
| `phoneNumber` | string | — |  |
| `email` | string | — |  |
| `emailConfirmed` | boolean | — | True if the email address has been confirmed by the user/staff, otherwise false. |
| `roles` | string[] | — | e.g. Owner, etc |
| `moduleRoles` | [`AppModuleRoleWrapper`](#appmodulerolewrapper)[] | — | Roles assigned to the User/Staff per ModuleType and PermissionType |
| `designationToAppUserMaps` | [`DesignationToAppUserMapRes`](#designationtoappusermapres)[] | — | Designation based roles assigned to the User/Staff |
| `deletedOnUtc` | string (date-time) | — | Indicates if the User/Staff was Soft Deleted |
| `address` | [`AddressRes`](#addressres) | — |  |

## State

**Type:** `integer` enum

Values: `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`

## StripeSessionRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `stripeSessionId` | string | — |  |
| `stripeCheckoutUrl` | string | — |  |
| `amount` | number (double) | — |  |
| `paymentStatus` | [`PaymentStatus`](#paymentstatus) | — |  |
| `companyId` | string (uuid) | — |  |
| `subscriptionPlanId` | string (uuid) | — |  |

## StripeSessionResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`StripeSessionRes`](#stripesessionres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## SubscriptionPaymentHistoryRes

Subscription payment history response item.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — | PK |
| `createdOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `updatedOnUtc` | string (date-time) | — | Automatically set in UnitOfWork.SaveChangesAsync. |
| `deletedOnUtc` | string (date-time) | — | Not null when the entity is soft-deleted. |
| `companyId` | string (uuid) | — | Company that owns this payment history record. |
| `subscriptionPlanId` | string (uuid) | — | Subscription plan associated with this payment history record. |
| `subscriptionPlan` | [`SubscriptionPlanRes`](#subscriptionplanres) | — |  |
| `paymentStatus` | [`PaymentStatus`](#paymentstatus) | — |  |

## SubscriptionPaymentHistoryResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`SubscriptionPaymentHistoryRes`](#subscriptionpaymenthistoryres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## SubscriptionPlanAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Name of the plan (e.g., "Free", "Basic", "Standard") |
| `description` | string | — | Description of the plan features |
| `maxUsers` | integer (int32) | — | Maximum number of users/staff allowed |
| `maxBrochures` | integer (int32) | — | Maximum number of brochures allowed |
| `maxBlobStorageInBytes` | integer (int64) | — | Maximum blob storage in bytes (e.g., 5 GB = 5,368,709,120 bytes) |
| `price` | number (double) | — | Price per billing period. 0 implies free plan. |
| `billingPeriodDays` | integer (int32) | — | Billing period in days (e.g., 30 for monthly, 365 for yearly) |
| `isEnabled` | boolean | — | Whether this plan is currently available for subscription |
| `displayOrder` | integer (int32) | — | Display order for UI |

## SubscriptionPlanARes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `name` | string | — | Name of the plan (e.g., "Free", "Basic", "Standard") |
| `description` | string | — | Description of the plan features |
| `maxUsers` | integer (int32) | — | Maximum number of users/staff allowed |
| `maxBrochures` | integer (int32) | — | Maximum number of brochures allowed |
| `maxBlobStorageInBytes` | integer (int64) | — | Maximum blob storage in bytes (e.g., 5 GB = 5,368,709,120 bytes) |
| `price` | number (double) | — | Price per billing period. 0 implies free plan. |
| `billingPeriodDays` | integer (int32) | — | Billing period in days (e.g., 30 for monthly, 365 for yearly) |
| `isEnabled` | boolean | — | Whether this plan is currently available for subscription |
| `displayOrder` | integer (int32) | — | Display order for UI |

## SubscriptionPlanAResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`SubscriptionPlanARes`](#subscriptionplanares)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## SubscriptionPlanRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `name` | string | — | Name of the plan (e.g., "Free", "Basic", "Standard") |
| `description` | string | — | Description of the plan features |
| `maxUsers` | integer (int32) | — | Maximum number of users/staff allowed |
| `maxBrochures` | integer (int32) | — | Maximum number of brochures allowed |
| `maxBlobStorageInBytes` | integer (int64) | — | Maximum blob storage in bytes (e.g., 5 GB = 5,368,709,120 bytes) |
| `price` | number (double) | — | Price per billing period. 0 implies free plan. |
| `billingPeriodDays` | integer (int32) | — | Billing period in days (e.g., 30 for monthly, 365 for yearly) |

## TimeSpan

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `ticks` | integer (int64) | — |  |
| `days` | integer (int32) | — |  |
| `hours` | integer (int32) | — |  |
| `milliseconds` | integer (int32) | — |  |
| `microseconds` | integer (int32) | — |  |
| `nanoseconds` | integer (int32) | — |  |
| `minutes` | integer (int32) | — |  |
| `seconds` | integer (int32) | — |  |
| `totalDays` | number (double) | — |  |
| `totalHours` | number (double) | — |  |
| `totalMilliseconds` | number (double) | — |  |
| `totalMicroseconds` | number (double) | — |  |
| `totalNanoseconds` | number (double) | — |  |
| `totalMinutes` | number (double) | — |  |
| `totalSeconds` | number (double) | — |  |

## TimeZoneInfo

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | — |  |
| `hasIanaId` | boolean | — |  |
| `displayName` | string | — |  |
| `standardName` | string | — |  |
| `daylightName` | string | — |  |
| `baseUtcOffset` | [`TimeSpan`](#timespan) | — |  |
| `supportsDaylightSavingTime` | boolean | — |  |

## TokenCompanyRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `name` | string | — |  |
| `logoBlobUrl` | string | — | Public Url with readonly SAS of company Logo |
| `currentSubscriptionPlanId` | string (uuid) | — | Current active subscription for this company |

## UiThemeUserProfileReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `uiThemeJson` | string | — | Json string to store user specific UI theme customizations like dark mode, font size etc. UI determines this value and sends it to the backend to store whenever user makes any changes in theme customizations. |

## UpdateBrochureTemplateAReq

Request payload for updating brochure template metadata.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Template display name. |
| `note` | string | — | Optional short note shown to admins/users for this template. |
| `jsonConfig` | string | — | Optional UI configuration JSON used when creating brochures from this template. |
| `isAvailable` | boolean | — | Indicates whether the template is visible to non-admin brochure APIs. |

## UpdateCompanyAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | — | CompanyName |
| `abn` | string | — | Australian Business Number |
| `notificationEmail` | string | — | Email Id to which notifications such as Shift Start will be sent. In case this is not available, email the Owner's email id |
| `publicDataPermittedHostsCsv` | string | — | Comma separated list of permitted hosts from which public data can be accessed. e.g. "www.example.com,subdomain.example.com" These will be validated against the HTTP request Referrer header when fetching the blob. |
| `publicCompanyDesignStyle` | string | — | The value (could be string or json) for style attribute for the public company designs. |
| `clickUpCompanyId` | string | — | Id of the company in ClickUp When this is null it indicates that clickup integration is not enabled. |

## UpdateCompanyFacadeBlobMapReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `blobModel` | [`BlobModelUpdateReq`](#blobmodelupdatereq) | yes |  |
| `facadeBlobType` | [`FacadeBlobType`](#facadeblobtype) | — |  |

## UpdateDesignBlobMapAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `blobModel` | [`BlobModelUpdateReq`](#blobmodelupdatereq) | yes |  |
| `designBlobType` | [`DesignBlobType`](#designblobtype) | — |  |

## UpdateStripeSessionAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | number (double) | — |  |
| `paymentStatus` | [`PaymentStatus`](#paymentstatus) | — |  |

## UpdateUserEmailOtp2FAReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `userId` | string (uuid) | — |  |
| `emailOtp2FAEnabled` | boolean | — |  |

## UserDetailedRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `userName` | string | — |  |
| `email` | string | — |  |
| `emailConfirmed` | boolean | — |  |
| `emailOtp2FAEnabled` | boolean | — |  |
| `phoneNumber` | string | — |  |
| `firstName` | string | — |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |
| `roles` | string[] | — | Directly and Indirectly (via designation) assigned roles to the User/Staff |
| `deletedOnUtc` | string (date-time) | — | Indicates if the User/Staff was Soft Deleted |
| `lockoutEnd` | string (date-time) | — |  |
| `lockoutEnabled` | boolean | — |  |
| `accessFailedCount` | integer (int32) | — |  |
| `termsAndConditionsAcceptedOnUtc` | string (date-time) | — | The timestamp when the user accepted the Terms and Conditions on the Api.Poco.Dtos.User.UserDetailedRes.TermsAndConditionsUrl Null when there are new terms and conditions or if user has not accepted yet. |
| `termsAndConditionsUrl` | string | — | Public Url associated with the Terms and Conditions accepted by the user UI will send this value when the user has accepted. Null when there are new terms and conditions or if user has not accepted yet. |
| `designationToAppUserMaps` | [`DesignationToAppUserMapRes`](#designationtoappusermapres)[] | — |  |

## UserDetailedResPage

Provides for paginated results.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | [`UserDetailedRes`](#userdetailedres)[] | — | The collection of objects belonging to this page. |
| `totalCount` | integer (int64) | — | The total number of objects in the database. |
| `pageNumber` | integer (int32) | — | The current page number. |
| `pageSize` | integer (int32) | — | The current page size. |

## UserMinRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `email` | string | — |  |
| `phoneNumber` | string | — |  |
| `firstName` | string | — |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |

## UserProfileReq

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `firstName` | string | yes |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |
| `phoneNumber` | string | — |  |
| `emailOtp2FAEnabled` | boolean | — |  |
| `address` | [`AddressReq`](#addressreq) | — |  |

## UserProfileRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `firstName` | string | — |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |
| `phoneNumber` | string | — |  |
| `email` | string | — |  |
| `emailOtp2FAEnabled` | boolean | — |  |
| `roles` | string[] | — |  |
| `address` | [`AddressRes`](#addressres) | — |  |
| `termsAndConditionsAcceptedOnUtc` | string (date-time) | — | The timestamp when the user accepted the Terms and Conditions on the Api.Poco.Dtos.User.UserProfileRes.TermsAndConditionsUrl Null when there are new terms and conditions or if user has not accepted yet. |
| `termsAndConditionsUrl` | string | — | Public Url associated with the Terms and Conditions accepted by the user UI will send this value when the user has accepted. Null when there are new terms and conditions or if user has not accepted yet. |
| `uiThemeJson` | string | — | Json string to store user specific UI theme customizations like dark mode, font size etc. UI determines this value and sends it to the backend to store whenever user makes any changes in theme customizations. |
| `designationToAppUserMaps` | [`DesignationToAppUserMapRes`](#designationtoappusermapres)[] | — |  |

## UserRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string (uuid) | — |  |
| `email` | string | — |  |
| `emailConfirmed` | boolean | — |  |
| `phoneNumber` | string | — |  |
| `firstName` | string | — |  |
| `middleName` | string | — |  |
| `lastName` | string | — |  |

## ValidateSubscriptionPlanRes

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `companyId` | string (uuid) | — |  |
| `hasExpired` | boolean | — | When true, then the next action can be to lock the company and/or notify the user. |
| `message` | string | — |  |
