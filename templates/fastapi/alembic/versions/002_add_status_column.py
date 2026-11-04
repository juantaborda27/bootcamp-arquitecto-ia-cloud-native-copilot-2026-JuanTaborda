"""add_status_column

Revision ID: 002_add_status
Revises: 001_initial
Create Date: 2026-08-24 12:05:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '002_add_status'
down_revision = '001_initial'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('users', sa.Column('status', sa.String(length=50), nullable=False, server_default='ACTIVE'))
    op.create_index('idx_users_email', 'users', ['email'])


def downgrade():
    op.drop_index('idx_users_email', table_name='users')
    op.drop_column('users', 'status')
