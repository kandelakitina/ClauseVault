# ClauseVault

## What This Is

A web service for managing commercial contract clauses with a drag-and-drop contract builder. Users can browse, filter, and assemble contracts from a library of pre-vetted clauses. The service supports bilingual clauses (English and Russian) for international contracts. Built with Svelte frontend, Deno backend, and MongoDB database, with OpenAPI documentation.

## Core Value

Users can efficiently build professional contracts by selecting from a curated library of vetted clauses, with the ability to create both monolingual and bilingual contracts as needed.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Support for bilingual clauses (English and Russian)
- [ ] Tag-based filtering system for clause discovery
- [ ] Drag-and-drop interface for contract assembly
- [ ] User accounts to save created contracts
- [ ] Popularity metrics for clauses
- [ ] Svelte-based frontend UI
- [ ] Deno backend API
- [ ] MongoDB database for storing clauses, contracts, and users
- [ ] OpenAPI documentation for the API

### Out of Scope

- Real-time collaboration on contracts — Single user workflow for now
- Advanced conditional logic in contract builder — Simple drag-and-drop approach
- Additional languages beyond English and Russian — Future expansion possibility

## Context

Target users are professionals involved in procurement, design, and construction services who need to create various types of contracts. The service will start with these domains but be flexible enough to accommodate other contract types. Bilingual support addresses international business needs.

## Constraints

- **Tech Stack**: Svelte for frontend, Deno for backend, MongoDB for database
- **Languages**: English and Russian support required
- **UI Approach**: Simple drag-and-drop without complex conditional logic
- **Documentation**: OpenAPI specs required for API

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Bilingual clause storage | International business requirements | Each clause document stores both English and Russian versions |
| Tag-based filtering | Efficient clause discovery | Users can find relevant clauses quickly |
| Account-based contract saving | Personalized contract management | Users maintain their own contract library |

---
*Last updated: 2026-02-25 after initialization*