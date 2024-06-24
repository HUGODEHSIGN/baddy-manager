import { integer, pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core';

export const court = pgTable(
  'court',
  {
    xata_version: integer('xata_version').default(0).notNull(),
    xata_createdat: timestamp('xata_createdat', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
    xata_updatedat: timestamp('xata_updatedat', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
    xata_id: text('xata_id')
      .default(`('rec_'::text || (xata_private.xid())::text)`)
      .notNull(),
    locationId: text('locationId')
      .notNull()
      .references(() => location.xata_id, { onDelete: 'cascade' }),
    name: text('name').default('Court'),
  },
  (table) => {
    return {
      _pgroll_new_court_xata_id_key: unique('_pgroll_new_court_xata_id_key').on(
        table.xata_id
      ),
    };
  }
);

export const location = pgTable(
  'location',
  {
    xata_id: text('xata_id')
      .default(`('rec_'::text || (xata_private.xid())::text)`)
      .notNull(),
    xata_version: integer('xata_version').default(0).notNull(),
    xata_createdat: timestamp('xata_createdat', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
    xata_updatedat: timestamp('xata_updatedat', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
    name: text('name').notNull(),
  },
  (table) => {
    return {
      _pgroll_new_location_xata_id_key: unique(
        '_pgroll_new_location_xata_id_key'
      ).on(table.xata_id),
    };
  }
);

export const party = pgTable(
  'party',
  {
    xata_id: text('xata_id')
      .default(`('rec_'::text || (xata_private.xid())::text)`)
      .notNull(),
    xata_version: integer('xata_version').default(0).notNull(),
    xata_createdat: timestamp('xata_createdat', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
    xata_updatedat: timestamp('xata_updatedat', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
    courtId: text('courtId')
      .notNull()
      .references(() => court.xata_id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      _pgroll_new_party_xata_id_key: unique('_pgroll_new_party_xata_id_key').on(
        table.xata_id
      ),
    };
  }
);

export const user = pgTable(
  'user',
  {
    xata_updatedat: timestamp('xata_updatedat', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
    xata_id: text('xata_id')
      .default(`('rec_'::text || (xata_private.xid())::text)`)
      .notNull(),
    xata_version: integer('xata_version').default(0).notNull(),
    xata_createdat: timestamp('xata_createdat', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
    name: text('name').notNull(),
    partyId: text('partyId').references(() => party.xata_id, {
      onDelete: 'cascade',
    }),
  },
  (table) => {
    return {
      _pgroll_new_user_xata_id_key: unique('_pgroll_new_user_xata_id_key').on(
        table.xata_id
      ),
    };
  }
);
