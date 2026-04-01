  METHOD materialset_delete_entity.

    DATA: lv_bukrs TYPE zcad_mat270-bukrs,
          lv_matnr TYPE zcad_mat270-matnr.

    " Ler chaves
    LOOP AT it_key_tab INTO DATA(ls_key).
      CASE ls_key-name.
        WHEN 'Bukrs'.
          lv_bukrs = ls_key-value.
        WHEN 'Matnr'.
          lv_matnr = ls_key-value.
      ENDCASE.
    ENDLOOP.

    " Verifica se encontrou as chaves
    IF lv_bukrs IS INITIAL OR lv_matnr IS INITIAL.
      RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
        EXPORTING
          textid  = /iwbep/cx_mgw_busi_exception=>business_error
          message = 'Chaves BUKRS/MATNR não informadas'.
    ENDIF.

    " Delete na tabela
    DELETE FROM zcad_mat270
     WHERE bukrs = lv_bukrs
       AND matnr = lv_matnr.

    " Verifica se apagou
    IF sy-subrc <> 0.
      RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
        EXPORTING
          textid  = /iwbep/cx_mgw_busi_exception=>business_error
          message = 'Registro não encontrado para exclusão'.
    ENDIF.

  ENDMETHOD.