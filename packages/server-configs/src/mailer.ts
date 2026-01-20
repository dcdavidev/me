import nodemailer from 'nodemailer';

import {
  EMAIL_PASSWORD,
  EMAIL_SERVICE,
  EMAIL_USER,
} from '@repo/server-schemas';

export const mailer = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});
