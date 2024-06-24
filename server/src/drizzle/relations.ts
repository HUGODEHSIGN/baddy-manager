import { relations } from "drizzle-orm/relations";
import { location, court, party, user } from "./schema";

export const courtRelations = relations(court, ({one, many}) => ({
	location: one(location, {
		fields: [court.locationId],
		references: [location.xata_id]
	}),
	parties: many(party),
}));

export const locationRelations = relations(location, ({many}) => ({
	courts: many(court),
}));

export const partyRelations = relations(party, ({one, many}) => ({
	court: one(court, {
		fields: [party.courtId],
		references: [court.xata_id]
	}),
	users: many(user),
}));

export const userRelations = relations(user, ({one}) => ({
	party: one(party, {
		fields: [user.partyId],
		references: [party.xata_id]
	}),
}));