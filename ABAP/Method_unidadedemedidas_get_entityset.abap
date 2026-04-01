  METHOD unidadedemedidas_get_entityset.
*---------------------------------------------------------------------
*   USADO NO FILTRO (MATCH CODE) DE UNIDADE DE MEDIDAS
*---------------------------------------------------------------------


    DATA: lt_unit TYPE TABLE OF zcl_zgcad_mat270_mpc=>ts_unidadedemedidash,
          ls_unit TYPE zcl_zgcad_mat270_mpc=>ts_unidadedemedidash.

  SELECT a~msehi, b~TXDIM
    INTO TABLE @DATA(lt_data)
    FROM t006 AS a
    INNER JOIN t006t AS b
      ON a~dimid = b~dimid
    WHERE b~spras = @sy-langu.

    LOOP AT lt_data INTO DATA(ls_data).
      CLEAR ls_unit.

      ls_unit-msehi = ls_data-msehi.
      ls_unit-msehl = ls_data-TXDIM.

      APPEND ls_unit TO lt_unit.
    ENDLOOP.

    et_entityset = lt_unit.

  ENDMETHOD.