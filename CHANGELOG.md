# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]

## [v3.2.2] - 2021-10-12

- minor([96](https://github.com/meateam/user-service/pull/96)): mail not required field

## [v3.2.1] - 2021-08-26

- minor([81](https://github.com/meateam/user-service/issues/81)): fix health-check pkg

## [v3.2.0] - 2021-05-18

- minor: ([93](https://github.com/meateam/user-service/pull/93)): add upn search for cts

## [v3.1.0] - 2021-04-11

### Changed

- minor: ([90](https://github.com/meateam/user-service/pull/90)): replace mail param to mailOrT in GetUsersByMail

## [v3.0.0]- 2021-03-25

### Changed

- major:([83](https://github.com/meateam/user-service/issues/83)): merge delegation service with user service

## [v2.1.1]- 2021-02-11

### Changed

- ISSUE([99](https://github.com/meateam/drive-project/issues/99)): update pkg, delete unused pkg and update deps

## [v2.1.0]- 2020-12-24

### Fixed

- FIX([62](https://github.com/meateam/user-service/pull/62)): fix GetApproverInfo with rabaz integration.

### Added

- FEAT([75](https://github.com/meateam/user-service/pull/62)): new RPC method CanApproveToUser

## [v2.0.0] - 2020-10-28

### Added

- FEAT([60](https://github.com/meateam/user-service/pull/60)): new RPC method GetApproverInfo

### Fixed

- FIX([53](https://github.com/meateam/user-service/pull/53)): fix use undefind lastName and convert it to empty string.

[unreleased]: https://github.com/meateam/user-service/compare/master...develop
[v2.0.0]: https://github.com/meateam/user-service/compare/v1.3...v2.0.0
[v2.1.0]: https://github.com/meateam/user-service/compare/v2.0.0...v2.1.0
[v2.1.1]: https://github.com/meateam/user-service/compare/v2.1.0...v2.1.1
[v3.0.0]: https://github.com/meateam/user-service/compare/v2.1.1...v3.0.0
[v3.1.0]: https://github.com/meateam/user-service/compare/v3.0.0...v3.1.0
[v3.2.0]: https://github.com/meateam/user-service/compare/v3.1.0...v3.2.0
[v3.2.1]: https://github.com/meateam/user-service/compare/v3.2.0...v3.2.1
