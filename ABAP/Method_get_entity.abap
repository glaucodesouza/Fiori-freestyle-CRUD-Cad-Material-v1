  METHOD materialset_get_entity.

    DATA: lv_bukrs TYPE bukrs,
          lv_matnr TYPE matnr.

    DATA: ls_db TYPE zcad_mat270.

* Ler chaves da requisição OData
    LOOP AT it_key_tab INTO DATA(ls_key).

      CASE ls_key-name.

        WHEN 'Bukrs'.
          lv_bukrs = ls_key-value.

        WHEN 'Matnr'.
          lv_matnr = ls_key-value.

      ENDCASE.

    ENDLOOP.

* Buscar registro
    SELECT SINGLE *
      INTO @ls_db
      FROM zcad_mat270
     WHERE bukrs = @lv_bukrs
       AND matnr = @lv_matnr.

    IF sy-subrc = 0.

      er_entity-bukrs = ls_db-bukrs.
      er_entity-matnr = ls_db-matnr.
      er_entity-maktx = ls_db-maktx.
      er_entity-meins = ls_db-meins.

* Conversão QUAN → STRING
      er_entity-menge = |{ ls_db-menge }|.

    ENDIF.

  ENDMETHOD.