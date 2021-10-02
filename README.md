# Webpart Test App

## Build and Test

Follow the build instruction in the solution.

## Config

### API Access

to use the Microsoft Graph API, e.g. for Term creation add the the snippet below.

[./config/package-solution.json](./config/package-solution.json)

```json
    "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "TermStore.ReadWrite.All"
      }
    ],
```

After installing the package, grant it permissions in [Sharepoint Admin Center: Advanced / API access](https://YOUR-DOMAIN-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx#/webApiPermissionManagement)
