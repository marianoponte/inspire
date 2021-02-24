"""empty message

Revision ID: 87613c980e92
Revises: 
Create Date: 2021-02-23 20:47:47.437371

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '87613c980e92'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('miembros',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=150), nullable=False),
    sa.Column('apellido', sa.String(length=150), nullable=False),
    sa.Column('email', sa.String(length=150), nullable=False),
    sa.Column('password', sa.String(length=150), nullable=False),
    sa.Column('puntos', sa.Integer(), nullable=True),
    sa.Column('comentario', sa.String(length=300), nullable=True),
    sa.Column('fecha_de_registro', sa.DateTime(timezone=True), nullable=True),
    sa.Column('fecha_de_nacimiento', sa.Date(), nullable=True),
    sa.Column('estado', sa.Enum('Activo', 'Inactivo'), nullable=False),
    sa.Column('permiso', sa.String(length=300), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('productos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=150), nullable=False),
    sa.Column('urlImage', sa.String(length=150), nullable=False),
    sa.Column('puntos', sa.Integer(), nullable=False),
    sa.Column('descripcion', sa.String(length=150), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('transacciones',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('descripcion', sa.String(length=300), nullable=True),
    sa.Column('tipo', sa.Enum('Acumulo', 'Canje'), nullable=False),
    sa.Column('monto', sa.Integer(), nullable=True),
    sa.Column('puntos', sa.Integer(), nullable=True),
    sa.Column('fecha_creacion', sa.DateTime(timezone=True), nullable=True),
    sa.Column('fecha_ultima_actualizacion', sa.DateTime(timezone=True), nullable=True),
    sa.Column('id_miembro', sa.Integer(), nullable=True),
    sa.Column('id_producto', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_miembro'], ['miembros.id'], ),
    sa.ForeignKeyConstraint(['id_producto'], ['productos.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('vouchers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('estado', sa.Enum('Disponible', 'Usado'), nullable=False),
    sa.Column('fecha_de_creacion', sa.DateTime(timezone=True), nullable=True),
    sa.Column('fecha_de_vencimiento', sa.DateTime(timezone=True), nullable=True),
    sa.Column('id_miembro', sa.Integer(), nullable=True),
    sa.Column('id_producto', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_miembro'], ['miembros.id'], ),
    sa.ForeignKeyConstraint(['id_producto'], ['productos.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('vouchers')
    op.drop_table('transacciones')
    op.drop_table('productos')
    op.drop_table('miembros')
    # ### end Alembic commands ###
